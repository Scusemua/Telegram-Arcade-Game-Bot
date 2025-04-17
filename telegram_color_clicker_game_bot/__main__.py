import os
from dotenv import load_dotenv
from flask import Flask, send_from_directory, request
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters, CallbackQueryHandler

from argparse import ArgumentParser
from typing import List
from flask import Flask, send_from_directory
from requests import get

from dotenv import load_dotenv

from telegram import Update
from telegram.ext import ApplicationBuilder, Application

GAME_SHORT_NAME: str = "Color Clicker"

flask_app = Flask(__name__)

@flask_app.route("/game")
def serve_game():
    return send_from_directory(".", "game.html")

@flask_app.route("/<path:path>")
def static_file(path):
    return send_from_directory(".", path)

class TelegramBot(object):
    def __init__(self, public_ipv4: str = "", token: str = ""):
        self._token = token
        self._game_url: str = os.path.join(public_ipv4, "game")

        self.telegram_app: Application = ApplicationBuilder().token(self._token).build()
        
        self.telegram_app.add_handler(CommandHandler("start", self.start))
        self.telegram_app.add_handler(CommandHandler("play", self.play))
        self.telegram_app.add_handler(CallbackQueryHandler(self.game_callback))

    # Telegram Bot Handlers
    async def start(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        await update.message.reply_text("Welcome! Type /play to start the game.")

    async def play(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        await context.bot.send_game(chat_id=update.effective_chat.id, game_short_name=GAME_SHORT_NAME)

    async def game_callback(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        query = update.callback_query
        if query.game_short_name != GAME_SHORT_NAME:
            await query.answer(text="Unknown game.")
            return
        await query.answer()
        await query.edit_message_text(f"Click to play: {self._game_url}")
    
    def run(self):
        print("🤖 Bot is running...")
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
    parser.add_argument("-i", "--ip", type = str, help = "Public IPv4.")

    args = parser.parse_args()

    token: str = os.environ.get("TELEGRAM_BOT_TOKEN", args.token)
    if not token:
        raise ValueError("No Telegram bot token specified")

    # admin_user_id: str = os.environ.get("ADMIN_USER_ID", args.admin_user_id)
    # bot_password: str = os.environ.get("BOT_PASSWORD", args.password)
    # bot_user_id: str = os.environ.get("BOT_USER_ID", args.bot_user_id)
    public_ipv4:str = os.environ.get("PUBLIC_IPV4", args.ip)
    port: int = int(os.environ.get("TELEGRAM_BOT_PORT", args.port))

    # if not bot_user_id:
    #     raise ValueError("No Telegram bot user ID specified")

    if not public_ipv4:
        public_ipv4 = get('https://api.ipify.org').content.decode('utf8')

    # log_file: str = args.log_file
    
    bot: TelegramBot = TelegramBot(public_ipv4=public_ipv4, token=token)

    # Start bot polling in background
    Thread(target=bot.run, daemon=True).start()

    # Start Flask server
    flask_app.run(host="0.0.0.0", port=port)

if __name__ == "__main__":
    main()
