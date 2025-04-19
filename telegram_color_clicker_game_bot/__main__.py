import os
from dotenv import load_dotenv

from argparse import ArgumentParser

from threading import Thread

from dotenv import load_dotenv


from telegram_color_clicker_game_bot.bot import TelegramBot

def main():
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
                        default="", help="Public IPv4 of the game.")
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
    
    # Override env with command line argument.
    if args.game_url != "" and args.game_url != os.environ.get("GAME_URL", ""):
        game_url: str = args.game_url

    print(f'Game URL: "{game_url}"')

    bot: TelegramBot = TelegramBot(
        game_url=game_url, token=token, http_port=args.port)

    if args.run_http_server:
        # Start bot polling in background
        Thread(target=bot.run_http_server, daemon=True).start()

    bot.run()


if __name__ == "__main__":
    main()
