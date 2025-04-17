import json
import os
import logging 
from uuid import uuid4
from dotenv import load_dotenv
from flask import Flask, send_from_directory, request
from telegram import InlineQueryResultGame, Update
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters, CallbackQueryHandler

from argparse import ArgumentParser
from typing import List
from flask import Flask, send_from_directory
from requests import get

from dotenv import load_dotenv

from telegram import Update
from telegram.ext import ApplicationBuilder, Application, InlineQueryHandler

GAME_SHORT_NAME: str = "color_clicker"
LOGGER_FORMAT: str = '%(asctime)s | %(levelname)s | %(message)s | %(name)s | %(funcName)s'

flask_app = Flask(__name__)

@flask_app.route("/game")
def serve_game():
    return send_from_directory(".", "game.html")

@flask_app.route("/<path:path>")
def static_file(path):
    return send_from_directory(".", path)

class TelegramBot(object):
    def __init__(self, game_url: str = "", token: str = ""):
        self._token = token
        self._game_url: str = game_url

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
        self.telegram_app.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, self.handle_web_app_data))

    # Telegram Bot Handlers
    async def start(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        await update.message.reply_text("Welcome! Type /play to start the game.")

    async def play(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        self.logger.info(f'Sending game to chat "{update.effective_chat.id}"')
        await context.bot.send_game(chat_id=update.effective_chat.id, game_short_name=GAME_SHORT_NAME)
    
    async def inline_query(self, update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
        results = [
            InlineQueryResultGame(id=str(uuid4()),game_short_name=GAME_SHORT_NAME)
        ]
        await update.inline_query.answer(results, cache_time=0)

    async def game_callback(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        query = update.callback_query
        if query.game_short_name != GAME_SHORT_NAME:
            await query.answer(text="Unknown game.", cache_time=0)
            return
        await query.answer(text=f"Click to play: {self._game_url}", url=self._game_url, cache_time=0)
    
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
    
    def run(self):
        self.logger.info("🤖 Bot is running...")
        self.telegram_app.run_polling(allowed_updates=Update.ALL_TYPES) 

# Run Flask + Telegram bot
def main():
    from threading import Thread
    from telegram.ext import ApplicationBuilder
    
    load_dotenv()

    parser = ArgumentParser()
    parser.add_argument("-t", "--token", type = str, default = "", help = "Telegram bot token. You may also specify this via the `TELEGRAM_BOT_TOKEN` environment variable.")
    parser.add_argument("-p", "--password", type = str, default = "", help = "Telegram bot password. If specified, only chats authenticated with this password (via the /auth <password> command) will be able to use the bot. You may also specify this via the `BOT_PASSWORD` environment variable.")
    parser.add_argument("-a", "--admin-user-id", type = str, default = "", help = "Telegram user ID of the admin. To get your own Telegram user ID, send a message to @userinfobot.")
    parser.add_argument("-b", "--bot-user-id", type = str, default = "", help = "Telegram user ID of the bot. Accessible by viewing the bot's page within Telegram.")
    parser.add_argument("-l", "--log-file", type = str, default = "telegram_bot.log", help = "Path for log file. If the empty string is specified, then logs will only be written to stdout.")
    parser.add_argument("-g", "--game-url", type = str, default="https://scusemua.github.io/Telegram-Color-Clicker-Game-Bot/", help = "Public IPv4 of the game.")

    args = parser.parse_args()

    token: str = os.environ.get("TELEGRAM_BOT_TOKEN", args.token)
    if not token:
        raise ValueError("No Telegram bot token specified")

    # admin_user_id: str = os.environ.get("ADMIN_USER_ID", args.admin_user_id)
    # bot_password: str = os.environ.get("BOT_PASSWORD", args.password)
    # bot_user_id: str = os.environ.get("BOT_USER_ID", args.bot_user_id)
    game_url:str = os.environ.get("GAME_URL", args.game_url)
    
    bot: TelegramBot = TelegramBot(game_url=game_url, token=token)

    # Start bot polling in background
    # Thread(target=bot.run, daemon=True).start()

    # Start Flask server
    # flask_app.run(host="0.0.0.0", port=port)
    
    bot.run()

if __name__ == "__main__":
    main()
