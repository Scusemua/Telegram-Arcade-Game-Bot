# 🎮 Color Match Telegram Game Bot

A simple Telegram-compatible HTML5 game where users must quickly click the rectangle that is correctly labeled with its color. Built using Python, Flask, and the Telegram Bot API.

---

## 🧠 Gameplay

- Two colored rectangles are shown.
- One is labeled correctly; the other is not.
- Click the correct one **before time runs out** to score a point!
- A wrong click or timeout ends the game.

---

## 🚀 Features

- HTML5 game served via Flask
- Telegram bot integration using `python-telegram-bot`
- Easy deployment with HTTPS (use [ngrok](https://ngrok.com/) or host on your server)
- Extensible for score tracking, leaderboards, etc.

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