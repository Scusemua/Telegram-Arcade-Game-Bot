# 🎮 Color Match Telegram Game Bot

A simple Telegram-compatible HTML5 game where users must quickly click the rectangle that is correctly labeled with its color. Built using Python, Flask, and the Telegram Bot API.

Try the game in your web browser [here](https://scusemua.github.io/Telegram-Color-Clicker-Game-Bot/).

---

## 🧠 Gameplay

- Two colored rectangles are shown.
- One is labeled correctly; the other is not.
- Click the correct one **before time runs out** to score a point!
- A wrong click or timeout ends the game.

_See the bottom of this README for a video preview of the game._

---

## 🚀 Features

- HTML5 game served via Flask
- Telegram bot integration using `python-telegram-bot`
- Easy deployment with HTTPS (use [ngrok](https://ngrok.com/) or host on your server)
- Extensible for score tracking, leaderboards, etc.
- Support for leaderboards and high score tracking within Telegram

---

## 📦 Requirements

- Python 3.8+
- Telegram Bot Token from [BotFather](https://t.me/botfather)
- A game registered with a short name via `/setgame`

Install dependencies:
```bash
pip install -r requirements.txt
```

## 📜 License
MIT License. Free to use, modify, and share.

https://github.com/user-attachments/assets/ee46cfd7-b0ee-45b2-a345-5fff096aad64
