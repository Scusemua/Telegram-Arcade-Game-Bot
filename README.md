# 🎮 Telegram Arcade Bot 👾

This bot offers several different Telegram games.

Try the games in your web browser [here](https://scusemua.github.io/Telegram-Arcade-Game-Bot/).

## 🚀 Features

- HTML5 game served via Flask
- Telegram bot integration using `python-telegram-bot`
- Easy deployment with HTTPS (use [ngrok](https://ngrok.com/) or host on your server)
- Extensible for score tracking, leaderboards, etc.
- Support for leaderboards and high score tracking within Telegram

## 📦 Installation

### 🛠 Requirements

- Python 3.8+
- Telegram Bot Token from [@BotFather](https://t.me/BotFather)
- Two games registered with a short name via `/setgame`

1. **Clone the repository**
   ```shell
   git clone https://github.com/Scusemua/Telegram-Arcade-Game-Bot.git
   cd Telegram-Arcade-Game-Bot

2. **Create a virtual environment (optional but recommended)**
   ```shell
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```shell
   pip install .
   ```

4. **Configuration (environmente variables)**
   Create a .env file in the root directory with the following required environment variable:
   ``` sh
   TELEGRAM_BOT_TOKEN="<your_bot_token_here>"
   GAME_URL="<base domain or IP address>"
   ```

   The `TELEGRAM_BOT_TOKEN` is used to specify the [Telegram Bot Token](https://core.telegram.org/bots/api#authorizing-your-bot) for the bot.

   **Note:** these arguments can also be passed as command line arguments. For a description of the available command line arguments, execute the following:
   ``` shell
   python -m telegram_color_clicker_game_bot --help 
   ```

## Usage

Start the bot with:
``` sh
python -m telegram_color_clicker_game_bot --run-http-server 
```

## 📜 License
MIT License. Free to use, modify, and share.

# Included Games

As of right now, there are two games offered by the Telegram Arcade Bot.

## 🎨 Color Clicker

A simple Telegram-compatible HTML5 game where users must quickly click the rectangle that is correctly labeled with its color. Built using Python, Flask, and the Telegram Bot API.

### 🧠 Gameplay

- Two colored rectangles are shown.
- One is labeled correctly; the other is not.
- Click the correct one **before time runs out** to score a point!
- A wrong click or timeout ends the game.

## ⌨️ Speed Words

You are shown a string of characters. You must quickly type an English word that contains those characters before the timer expires.

### 🧠 Gameplay

- Given a sequence of letters, enter an English word containing those letters
- You cannot re-use the same word multiple times (even for different sequences of characters)
- You are awarded additional time for each correct word
- You can increase the amount of time you are awarded by:
  - Increasing your streak (i.e., the number of consecutive, valid submissions)
  - Submitting longer words 
  - Surviving longer (the more correct submissions, the more time you get back -- and the faster the timer decreases)

https://github.com/user-attachments/assets/8673f6e2-6ae2-4d56-80ec-8ad53177d637

## ♾️ 24 Challenge / 24 Puzzle

### 🧠 Gameplay

- Two colored rectangles are shown.
- One is labeled correctly; the other is not.
- Click the correct one **before time runs out** to score a point!
- A wrong click or timeout ends the game.

https://github.com/user-attachments/assets/ee46cfd7-b0ee-45b2-a345-5fff096aad64
