# 🎮 Telegram Arcade Bot 👾

This bot offers several different Telegram games.

## 🚀 Features

- HTML5 game served via Flask
- Telegram bot integration using `python-telegram-bot`
- Easy deployment with HTTPS (use [ngrok](https://ngrok.com/) or host on your server)
- Extensible for score tracking, leaderboards, etc.
- Support for leaderboards and high score tracking within Telegram

## 📦 Requirements

- Python 3.8+
- Telegram Bot Token from [BotFather](https://t.me/botfather)
- Two games registered with a short name via `/setgame`

Install dependencies:
```bash
pip install -r requirements.txt
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

## ♾️ 24 Challenge / 24 Puzzle

### 🧠 Gameplay

- Two colored rectangles are shown.
- One is labeled correctly; the other is not.
- Click the correct one **before time runs out** to score a point!
- A wrong click or timeout ends the game.

_See the bottom of this README for a video preview of the game._

https://github.com/user-attachments/assets/ee46cfd7-b0ee-45b2-a345-5fff096aad64
