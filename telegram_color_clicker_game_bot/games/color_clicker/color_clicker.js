// Get the user ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("user_id"); // e.g., "12345"
const chatId = urlParams.get("chat_id"); // Optional
const messageId = urlParams.get("message_id"); // Optional
const inlineMessageId = urlParams.get("inline_message_id"); // Optional

const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "black",
  "cyan",
  "magenta",
];

// Game settings
const BASE_TIMER_SPEED = 100; // ms between updates (slower = faster timer)
const MAX_SPEED_MULTIPLIER = 10; // Maximum speed increase
const SPEED_INCREASE_RATE = 0.25; // How much speed increases per point

let score = 0;
let highScore = 0;
let timerWidth = 100;
let nextRoundDelay = 500;
let timerInterval;
let gameActive = false;
let correctIndex;
let currentSpeedMultiplier = 1;
let newHighScore = false;
let isTelegramWebApp = false;
let tg = null;
let prevColor1 = "";
let prevColor2 = "";

const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const timerElement = document.getElementById("timer");
const colorOptionsElement = document.getElementById("colorOptions");
const messageElement = document.getElementById("message");
const startBtn = document.getElementById("startBtn");
//   const leaderboardBtn = document.getElementById("leaderboardBtn");
//   const shareBtn = document.getElementById("shareBtn");
const difficultyElement = document.getElementById("difficulty");
//   const leaderboardEntries = document.getElementById("leaderboardEntries");
//   const nameModal = document.getElementById("nameModal");
const playerNameInput = document.getElementById("playerName");
//   const submitNameBtn = document.getElementById("submitName");

// Check if running in Telegram WebApp
function checkTelegramWebApp() {
  try {
    if (window.Telegram && window.Telegram.WebApp) {
      tg = window.Telegram.WebApp;
      isTelegramWebApp = true;
      tg.expand(); // Expand the web app to full screen
      // shareBtn.stlye.display = "inline-block";
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}

// Initialize game
async function initGame() {
  checkTelegramWebApp();
  await loadHighScore();
  // await loadLeaderboard();

  startBtn.addEventListener("click", startGame);
  // leaderboardBtn.addEventListener("click", showLeaderboard);
  // submitNameBtn.addEventListener("click", submitHighScore);
}

function loadHighScoresLocal() {
  const savedHighScore = localStorage.getItem("colorLabelHighScore");
  highScore = savedHighScore ? parseInt(savedHighScore) : 0;
  return highScore;
}

async function loadHighScoresFromBackend() {
  let target = "/api/highscores?user_id=" + userId.toString();

  if (chatId && messageId) {
    target +=
      "&chat_id=" +
      chatId.toString() +
      "&message_id=" +
      messageId.toString();
  } else {
    target += "&inline_message_id=" + inlineMessageId.toString();
  }

  const response = await fetch(target, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  window.alert(`highscores: ${JSON.stringify(data)}`);

  let entries = [];

  data["highscores"].forEach((val) => {
    entries.add({
      name: val["user"]["first_name"] + " " + val["user"]["last_name"],
      score: val["score"],
    });
  });

  return data;
}

// Load high score from appropriate storage
async function loadHighScore() {
  if (isTelegramWebApp) {
    // Try to load from Telegram cloud storage
    const data = await tg.CloudStorage.getItem("highScore");
    highScore = data ? parseInt(data) : 0;
  } else {
    // Fallback to localStorage
    highScore = loadHighScoresLocal();
  }
  highScoreElement.textContent = highScore;
}

// Save high score to appropriate storage
async function saveHighScore() {
  if (isTelegramWebApp) {
    await tg.CloudStorage.setItem("highScore", highScore.toString());
  } else {
    localStorage.setItem("colorLabelHighScore", highScore.toString());
  }
}

// Load leaderboard
//   async function loadLeaderboard() {
//     if (isTelegramWebApp) {
//       try {
//         // In a real app, you would fetch from your server or use Telegram's storage
//         // This is a simplified version using cloud storage
//         const lbData = await tg.CloudStorage.getItem("leaderboard");
//         if (lbData) {
//           displayLeaderboard(JSON.parse(lbData));
//         }
//       } catch (e) {
//         console.error("Error loading leaderboard:", e);
//       }
//     } else if (userId && ((chatId && messageId) || inlineMessageId)) {
//       try {
//         highScores = await loadHighScoresFromBackend();
//         displayLeaderboard(highScores);
//       } catch (error) {
//         window.alert(`Failed to fetch high scores: ${error}`);

//         // Local fallback
//         const lbData = localStorage.getItem("colorLabelLeaderboard");
//         if (lbData) {
//           displayLeaderboard(JSON.parse(lbData));
//         }
//       }
//     } else {
//       // Local fallback
//       const lbData = localStorage.getItem("colorLabelLeaderboard");
//       if (lbData) {
//         displayLeaderboard(JSON.parse(lbData));
//       }
//     }
//   }

// Display leaderboard
//   function displayLeaderboard(entries) {
//     if (!entries || entries.length === 0) return;

//     // Sort by score (descending)
//     entries.sort((a, b) => b.score - a.score);

//     // Display top 10
//     leaderboardEntries.innerHTML = "";
//     const topEntries = entries.slice(0, 10);

//     topEntries.forEach((entry, index) => {
//       const entryEl = document.createElement("div");
//       entryEl.className = "leaderboard-entry";
//       entryEl.innerHTML = `
//             <span class="leaderboard-name">${index + 1}. ${
//         entry.name
//       }</span>
//             <span>${entry.score}</span>
//         `;
//       leaderboardEntries.appendChild(entryEl);
//     });
//   }

// Save to leaderboard
//   async function saveToLeaderboard(name, score) {
//     let leaderboard = [];

//     if (isTelegramWebApp) {
//       try {
//         const lbData = await tg.CloudStorage.getItem("leaderboard");
//         leaderboard = lbData ? JSON.parse(lbData) : [];
//       } catch (e) {
//         console.error("Error loading leaderboard:", e);
//       }
//     } else {
//       const lbData = localStorage.getItem("colorLabelLeaderboard");
//       leaderboard = lbData ? JSON.parse(lbData) : [];
//     }

//     // Add new entry
//     leaderboard.push({
//       name: name || "Anonymous",
//       score: score,
//       date: new Date().toISOString(),
//       userId: isTelegramWebApp ? tg.initDataUnsafe.user?.id : null,
//     });

//     // Save back
//     if (isTelegramWebApp) {
//       try {
//         await tg.CloudStorage.setItem(
//           "leaderboard",
//           JSON.stringify(leaderboard)
//         );
//       } catch (e) {
//         console.error("Error saving leaderboard:", e);
//       }
//     } else {
//       localStorage.setItem(
//         "colorLabelLeaderboard",
//         JSON.stringify(leaderboard)
//       );
//     }

//     // Refresh display
//     displayLeaderboard(leaderboard);
//   }

function startGame() {
  score = 0;
  currentSpeedMultiplier = 1;
  newHighScore = false;
  scoreElement.textContent = score;
  difficultyElement.textContent = "1x";
  messageElement.textContent = "";
  startBtn.style.display = "none";
  // leaderboardBtn.style.display = "none";
  // shareBtn.style.display = "none";
  gameActive = true;
  highScoreElement.classList.remove("new-high-score");
  nextRound();
}

function nextRound() {
  // Clear previous options
  colorOptionsElement.innerHTML = "";

  // Reset timer
  clearInterval(timerInterval);
  timerWidth = 100;
  timerElement.style.width = "100%";
  timerElement.style.backgroundColor = "#4CAF50";

  // Generate two random colors
  let shuffledColors = [...colors].sort(() => 0.5 - Math.random());
  let color1 = shuffledColors[0];
  let color2 = shuffledColors[1];

  // Don't generate the exact same colors
  while (color1 == prevColor1 && color2 == prevColor2) {
    shuffledColors = [...colors].sort(() => 0.5 - Math.random());
    color1 = shuffledColors[0];
    color2 = shuffledColors[1];
  }

  // Decide which one will be correct (randomly)
  correctIndex = Math.random() < 0.5 ? 0 : 1;

  // Create the color boxes
  for (let i = 0; i < 2; i++) {
    const box = document.createElement("div");
    box.className = "color-box";

    if (i === correctIndex) {
      // Correct label
      box.textContent = color1;
      box.style.backgroundColor = color1;
    } else {
      // Incorrect label (use a different color name)
      const incorrectColor =
        color1 === color2 ? colors.find((c) => c !== color1) : color2;
      box.textContent = incorrectColor;
      box.style.backgroundColor = color1;
    }

    box.addEventListener("click", () => handleClick(i));
    colorOptionsElement.appendChild(box);
  }

  // Calculate timer speed based on score
  currentSpeedMultiplier = Math.min(
    1 + score * SPEED_INCREASE_RATE,
    MAX_SPEED_MULTIPLIER
  );
  difficultyElement.textContent = currentSpeedMultiplier.toFixed(2) + "x";

  // Start timer with current speed
  timerInterval = setInterval(
    updateTimer,
    BASE_TIMER_SPEED / currentSpeedMultiplier
  );

  prevColor1 = color1;
  prevColor2 = color2;
}

function updateTimer() {
  timerWidth -= 1;
  timerElement.style.width = `${timerWidth}%`;

  // Change color as time runs out
  if (timerWidth < 30) {
    timerElement.style.backgroundColor = "#f44336";
  } else if (timerWidth < 60) {
    timerElement.style.backgroundColor = "#FFC107";
  }

  if (timerWidth <= 0) {
    clearInterval(timerInterval);
    endGame("Time's up!");
  }
}

function handleClick(clickedIndex) {
  if (!gameActive) return;

  clearInterval(timerInterval);

  if (clickedIndex === correctIndex) {
    // Correct choice
    score++;
    scoreElement.textContent = score;
    messageElement.textContent = "✅ Correct!";
    messageElement.style.color = "green";

    // Brief pause before next round
    setTimeout(nextRound, nextRoundDelay);
  } else {
    // Wrong choice
    endGame("Wrong choice!");
  }
}

async function endGame(message) {
  gameActive = false;
  const isNewHighScore = score > highScore;

  if (isNewHighScore) {
    highScore = score;
    highScoreElement.textContent = highScore;
    await saveHighScore();
    newHighScore = true;
    highScoreElement.classList.add("new-high-score");

    // Show name input modal for new high score
    //   showNameModal();
  }

  let endMessage = `${message} Score: ${score}`;
  if (isNewHighScore) {
    endMessage += " (New High Score!)";
  } else {
    endMessage += ` | High Score: ${highScore}`;
  }

  messageElement.textContent = endMessage;
  messageElement.style.color = "red";
  startBtn.style.display = "inline-block";
  // leaderboardBtn.style.display = "inline-block";

  // if (isTelegramWebApp) {
  //   shareBtn.style.display = "inline-block";
  // }

  startBtn.textContent = "Play Again";

  // Send message to Telegram chat if running in WebApp
  if (isTelegramWebApp) {
    TelegramGameProxy.shareScore();
  }

  if (!userId || ((!chatId || !messageId) && !inlineMessageId)) {
    return;
  }

  // POST request
  const data = {
    score: score,
    user_id: userId,
    chat_id: chatId,
    message_id: messageId,
    inline_message_id: inlineMessageId,
  };

  fetch("/api/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (responseElement) {
        responseElement.textContent = JSON.stringify(data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//   function showNameModal() {
//     // Pre-fill with Telegram user name if available
//     if (isTelegramWebApp && tg.initDataUnsafe.user) {
//       const user = tg.initDataUnsafe.user;
//       playerNameInput.value = user.first_name || "";
//       if (user.last_name) {
//         playerNameInput.value += " " + user.last_name;
//       }
//       playerNameInput.value = playerNameInput.value.trim();
//     }
//     nameModal.style.display = "flex";
//   }

//   async function submitHighScore() {
//     const name = playerNameInput.value.trim();
//     if (name) {
//       await saveToLeaderboard(name, score);
//     }
//     nameModal.style.display = "none";
//   }

function showLeaderboard() {
  // Leaderboard is already visible at the bottom
  // Scroll to it
  document.getElementById("leaderboard").scrollIntoView({
    behavior: "smooth",
  });
}

// Initialize the game when page loads
window.onload = initGame;