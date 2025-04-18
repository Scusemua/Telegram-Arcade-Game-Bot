import json
import os
import logging
import requests
from uuid import uuid4
from dotenv import load_dotenv
from typing import Dict, Any
from flask import Flask, send_from_directory, jsonify
from telegram import InlineQueryResultGame, Update
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters, CallbackQueryHandler, InlineQueryHandler, ApplicationBuilder

from argparse import ArgumentParser
from flask import Flask, send_from_directory, request

from dotenv import load_dotenv

from flask_cors import CORS

GAME_SHORT_NAME: str = "color_clicker"
LOGGER_FORMAT: str = '%(asctime)s | %(levelname)s | %(message)s | %(name)s | %(funcName)s'


class TelegramBot(object):
    def __init__(self, game_url: str = "", token: str = "", http_port: int = 8082):
        self._token = token
        self._game_url: str = game_url
        self._http_port: int = http_port

        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.DEBUG)

        # Create a handler and set the formatter
        stream_handler = logging.StreamHandler()
        formatter = logging.Formatter(LOGGER_FORMAT)
        stream_handler.setFormatter(formatter)

        # Add the handler to the logger
        self.logger.addHandler(stream_handler)

        file_handler = logging.FileHandler("telegram_color_clicker_bot.log")
        file_handler.setFormatter(formatter)
        self.logger.addHandler(file_handler)

        self.telegram_app: Application = ApplicationBuilder().token(self._token).build()

        self.telegram_app.add_handler(CommandHandler("start", self.start))
        self.telegram_app.add_handler(CommandHandler("play", self.play))
        self.telegram_app.add_handler(InlineQueryHandler(self.inline_query))
        self.telegram_app.add_handler(CallbackQueryHandler(self.game_callback))
        self.telegram_app.add_handler(MessageHandler(
            filters.StatusUpdate.WEB_APP_DATA, self.handle_web_app_data))

    # Telegram Bot Handlers
    async def start(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        await update.message.reply_text("Welcome! Type /play to start the game.")

    async def play(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        self.logger.info(f'Sending game to chat "{update.effective_chat.id}"')
        await context.bot.send_game(chat_id=update.effective_chat.id, game_short_name=GAME_SHORT_NAME)

    async def inline_query(self, update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
        results = [
            InlineQueryResultGame(
                id=str(uuid4()), game_short_name=GAME_SHORT_NAME)
        ]
        await update.inline_query.answer(results, cache_time=0)

    async def game_callback(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        callback_query = update.callback_query
        game_short_name = callback_query.game_short_name
    
        if game_short_name != GAME_SHORT_NAME:
            await callback_query.answer(text="Unknown game.", cache_time=0)
            return 

        self.logger.debug(f"game_callback::update: {update}")
        
        try:
            chat_id = callback_query.message.chat.id  # Group chat ID
            self.logger.debug(f'Set chat ID to callback_query.message.chat.id ("{chat_id}")')
        except AttributeError:
            chat_id = update.effective_chat.id
            self.logger.debug(f'Set chat ID to update.effective_chat.id ("{chat_id}")')
        
        try:
            user_id = callback_query.from_user.id     # User who clicked "Play" # 
            self.logger.debug(f'Set user ID to callback_query.from_user.id ("{user_id}")')
        except AttributeError:
            user_id = update.effective_user.id
            self.logger.debug(f'Set user ID to update.effective_user.id ("{user_id}")')

        url: str = f'{self._game_url}?user_id={user_id}&chat_id={chat_id}'

        self.logger.debug(f'url: "{url}"')

        await callback_query.answer(text=f"Click to play: {self._game_url}", url=url, cache_time=0)

    async def handle_web_app_data(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        user_id = update.effective_user.id

        data = json.loads(update.message.web_app_data.data)
        score = int(data.get("score", 0))

        self.logger.info(f'Received score for user "{user_id}": {score}')

        await context.bot.set_game_score(
            user_id=user_id,
            score=score,
            chat_id=update.message.chat.id,
            message_id=update.message.message_id,
            force=True  # allow overwrite of lower scores
        )

    def run_http_server(self):
        app = Flask(__name__)
        CORS(app)  # Allow all origins

        @app.route('/api/data', methods=['POST'])
        def handle_data():
            data = request.json
            self.logger.debug(f"Received POST data: {data}")

            user_id = data['user_id']
            chat_id = data.get('chat_id', "")
            score = data['score']

            request_payload: Dict[str, Any] = {
                "user_id": user_id,
                "score": score,
                # "force": True,  # Override previous score
            }

            if chat_id != "":
                request_payload['chat_id'] = chat_id

            self.logger.debug(
                f"Sending request to Telegram: {json.dumps(request_payload)}")

            # Call Telegram API
            response = requests.post(
                f"https://api.telegram.org/bot{self._token}/setGameScore",
                request_payload,
            )

            self.logger.debug(f'Response from Telegram: {response.json()}')
            return jsonify(response.json())

        @app.route("/game")
        def serve_game():
            return send_from_directory(".", "game.html")

        app.run(host="0.0.0.0", port=self._http_port,
                debug=False, use_reloader=False)

    def run(self):
        # ensure_event_loop()
        self.logger.info("Bot is running...")
        self.telegram_app.run_polling(allowed_updates=Update.ALL_TYPES)

# Run Flask + Telegram bot


def main():
    from threading import Thread
    from telegram.ext import ApplicationBuilder

    load_dotenv()

    parser = ArgumentParser()
    parser.add_argument("-t", "--token", type=str, default="",
                        help="Telegram bot token. You may also specify this via the `TELEGRAM_BOT_TOKEN` environment variable.")
    parser.add_argument("-p", "--password", type=str, default="",
                        help="Telegram bot password. If specified, only chats authenticated with this password (via the /auth <password> command) will be able to use the bot. You may also specify this via the `BOT_PASSWORD` environment variable.")
    parser.add_argument("-a", "--admin-user-id", type=str, default="",
                        help="Telegram user ID of the admin. To get your own Telegram user ID, send a message to @userinfobot.")
    parser.add_argument("-b", "--bot-user-id", type=str, default="",
                        help="Telegram user ID of the bot. Accessible by viewing the bot's page within Telegram.")
    parser.add_argument("-l", "--log-file", type=str, default="telegram_bot.log",
                        help="Path for log file. If the empty string is specified, then logs will only be written to stdout.")
    parser.add_argument("-g", "--game-url", type=str,
                        default="https://scusemua.github.io/Telegram-Color-Clicker-Game-Bot/", help="Public IPv4 of the game.")
    parser.add_argument("--port", type=int, default=8082, help="HTTP port.")
    parser.add_argument("--run-http-server", action='store_true',
                        help="If true, then run HTTP backend server.")

    args = parser.parse_args()

    token: str = os.environ.get("TELEGRAM_BOT_TOKEN", args.token)
    if not token:
        raise ValueError("No Telegram bot token specified")

    # admin_user_id: str = os.environ.get("ADMIN_USER_ID", args.admin_user_id)
    # bot_password: str = os.environ.get("BOT_PASSWORD", args.password)
    # bot_user_id: str = os.environ.get("BOT_USER_ID", args.bot_user_id)
    game_url: str = os.environ.get("GAME_URL", args.game_url)

    print(f'Game URL: "{game_url}"')

    bot: TelegramBot = TelegramBot(
        game_url=game_url, token=token, http_port=args.port)

    if args.run_http_server:
        # Start bot polling in background
        Thread(target=bot.run_http_server, daemon=True).start()

    bot.run()


if __name__ == "__main__":
    main()
