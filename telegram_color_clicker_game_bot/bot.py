import os
import json
import logging
import requests
from typing import List 
from uuid import uuid4
from typing import Dict, Any
from flask import Flask, send_from_directory, jsonify, abort
from telegram import InlineQueryResultGame, Update
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters, CallbackQueryHandler, InlineQueryHandler, ApplicationBuilder

from flask import Flask, send_from_directory, request


from flask_cors import CORS

COLOR_CLICKER_SHORT_NAME: str = "color_clicker"
CHALLENGE_24_SHORT_NAME: str = "challenge24"
WORD_GAME_SHORT_NAME: str = "speed_words"

GAMES: List[str] = [
    COLOR_CLICKER_SHORT_NAME, CHALLENGE_24_SHORT_NAME, WORD_GAME_SHORT_NAME
]

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
        await context.bot.send_game(chat_id=update.effective_chat.id, game_short_name=COLOR_CLICKER_SHORT_NAME)

    async def inline_query(self, update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
        results = [
            InlineQueryResultGame(
                id=str(uuid4()), game_short_name=COLOR_CLICKER_SHORT_NAME),
            InlineQueryResultGame(
                id=str(uuid4()), game_short_name=CHALLENGE_24_SHORT_NAME),
            InlineQueryResultGame(
                id=str(uuid4()), game_short_name=WORD_GAME_SHORT_NAME)
        ]
        await update.inline_query.answer(results, cache_time=0)

    async def game_callback(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        callback_query = update.callback_query
        game_short_name = callback_query.game_short_name
        
        self.logger.debug(f'game_short_name: "{game_short_name}"')
    
        if game_short_name not in GAMES:
            await callback_query.answer(text="Unknown game.", cache_time=0)
            return 

        self.logger.debug(f'game_callback::update: {json.dumps(update.to_dict(), indent="  ")}')
        
        if callback_query.message and callback_query.message.chat:
            chat_id = callback_query.message.chat.id  # Group chat ID
            self.logger.debug(f'Set chat ID to callback_query.message.chat.id ("{chat_id}")')
        elif update.effective_chat:
            chat_id = update.effective_chat.id
            self.logger.debug(f'Set chat ID to update.effective_chat.id ("{chat_id}")')
        else:
            chat_id = ""
        
        if callback_query.from_user:
            user_id = callback_query.from_user.id     # User who clicked "Play" # 
            self.logger.debug(f'Set user ID to callback_query.from_user.id ("{user_id}")')
        else:
            user_id = update.effective_user.id
            self.logger.debug(f'Set user ID to update.effective_user.id ("{user_id}")')
        
        if callback_query.message:
            self.logger.debug(f'update.message: "{callback_query.message}"')
            message_id: str = str(callback_query.message.message_id)
        else:
            message_id: str = ""
        
        inline_message_id = callback_query.inline_message_id or ""

        url: str = f'{self._game_url}/game/{game_short_name}?user_id={user_id}&chat_id={chat_id}&inline_message_id={inline_message_id}&message_id={message_id}'

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
        
        @app.route('/api/highscores', methods=['GET'])
        def get_highscores():
            user_id = request.args.get("user_id")
            inline_message_id = request.args.get("inline_message_id", "")
            chat_id = request.args.get('chat_id', "")
            message_id = request.args.get("message_id", "")
            
            self.logger.debug(f"Received GET request: /api/highscores[UserID={user_id}, ChatID={chat_id}, MessageID={message_id}, InlineMessageID={inline_message_id}]")
            
            request_payload: Dict[str, Any] = {
                "user_id": int(user_id),
                "force": False,
                "disable_edit_message": False,
                "inline_message_id": inline_message_id,
                # "force": True,  # Override previous score
            }

            if chat_id != "":
                request_payload['chat_id'] = int(chat_id)

            if message_id != "":
                request_payload['message_id'] = int(message_id)
            
            # Call Telegram API
            response = requests.post(
                f"https://api.telegram.org/bot{self._token}/getGameHighScores",
                request_payload,
            )
            
            res = response.json()
            
            if not isinstance(res, dict) or not res.get("ok", False):
                return jsonify({})

            resp = {
                "highscores": response.json()['result'],
            }
            self.logger.debug(f'Returning from Telegram: {json.dumps(resp, indent = "  ")}')
            
            return jsonify(resp)

        @app.route('/api/data', methods=['POST'])
        def handle_data():
            data = request.json
            self.logger.debug(f"Received POST data: {data}")

            # Required 
            user_id = data['user_id']
            score = data['score']
            
            # Optional
            inline_message_id = data.get("inline_message_id", "")
            chat_id = data.get('chat_id', "")
            message_id = data.get("message_id", "")

            request_payload: Dict[str, Any] = {
                "user_id": int(user_id),
                "score": int(score),
                "force": False,
                "disable_edit_message": False,
                "inline_message_id": inline_message_id,
                # "force": True,  # Override previous score
            }

            if chat_id != "":
                request_payload['chat_id'] = int(chat_id)

            if message_id != "":
                request_payload['message_id'] = int(message_id)

            self.logger.debug(
                f"Sending request to Telegram: {json.dumps(request_payload)}")

            # Call Telegram API
            response = requests.post(
                f"https://api.telegram.org/bot{self._token}/setGameScore",
                request_payload,
            )

            self.logger.debug(f'Response from Telegram: {response.json()}')
            return jsonify(response.json())

        @app.route("/game/<game_name>")
        def serve_game(game_name):
            if game_name == COLOR_CLICKER_SHORT_NAME:
                return send_from_directory(".", "color_clicker.html")
            elif game_name == CHALLENGE_24_SHORT_NAME:
                return send_from_directory(".", "24_challenge.html")
            elif game_name == WORD_GAME_SHORT_NAME:
                return send_from_directory(".", "speed_words.html")
            
            abort(code=400, args=f'Invalid game: "{game_name}"')

        app.run(host="0.0.0.0", port=self._http_port,
                debug=False, use_reloader=False)

    def run(self):
        # ensure_event_loop()
        self.logger.info("Bot is running...")
        self.telegram_app.run_polling(allowed_updates=Update.ALL_TYPES)
