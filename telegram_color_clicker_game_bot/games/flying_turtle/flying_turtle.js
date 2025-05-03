// Get the user ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("user_id"); // e.g., "12345"
const chatId = urlParams.get("chat_id"); // Optional
const messageId = urlParams.get("message_id"); // Optional
const inlineMessageId = urlParams.get("inline_message_id"); // Optional

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const gameOverElement = document.getElementById("game-over");
const scrollSpeedElement = document.getElementById("scroll-speed");
const instructionsElement = document.getElementById("instructions");
const playerImage = document.getElementById("player-icon");

const SCROLL_SPEED_DELTA = 0.5;
const MAX_SCROLL_SPEED = 5;

// Game variables
let player = {
  x: 100,
  y: 300,
  width: 64,
  height: 35.75,
  velocity: 0,
  gravity: 0.1,
  jumpForce: -3.5,
  color: "#ff5252",
};

let pipes = [];
let score = 0;
let gameRunning = false;
let animationId;
let pipeGap = 150;
let pipeFrequency = 1500; // milliseconds
let lastPipeTime = 0;
let scrollSpeed = 2;

// Event listeners
document.addEventListener("keydown", handleKeyDown);
canvas.addEventListener("click", handleJump);

function handleKeyDown(e) {
  if (e.code === "Space") {
    if (!gameRunning) {
      startGame();
    } else {
      handleJump();
    }
    e.preventDefault();
  }
}

function handleClick() {
  if (!gameRunning) {
    startGame();
  } else {
    handleJump();
  }
  e.preventDefault();
}

function handleJump() {
  if (gameRunning) {
    player.velocity = player.jumpForce;
  }
}

function startGame() {
  player.y = 300;
  player.velocity = 0;
  pipes = [];
  score = 0;
  scoreElement.textContent = "Score: 0";
  gameRunning = true;
  gameOverElement.style.display = "none";
  instructionsElement.style.display = "none";
  lastPipeTime = 0;

  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  gameLoop();
}

function gameLoop(timestamp) {
  update(timestamp);
  draw();

  if (gameRunning) {
    animationId = requestAnimationFrame(gameLoop);
  }
}

function update(timestamp) {
  // Update player
  player.velocity += player.gravity;
  player.y += player.velocity;

  // Check if player hits the ground or ceiling
  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    gameOver();
  } else if (player.y < 0) {
    player.y = 0;
    gameOver();
  }

  // Generate new pipes
  if (timestamp - lastPipeTime > pipeFrequency) {
    createPipe();
    lastPipeTime = timestamp;
  }

  // Update pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].x -= scrollSpeed;

    // Check for collision
    if (checkCollision(player, pipes[i])) {
      gameOver();
    }

    // Check if player passed the pipe
    if (
      !pipes[i].passed &&
      pipes[i].x + pipes[i].width < player.x &&
      !pipes[i].scored
    ) {
      pipes[i].passed = true;
      pipes[i].scored = true;
      score += 0.5;
      console.log(`Passed pipe ${i}. Score: ${score}.`);
      scoreElement.textContent = "Score: " + score;

      // Increase difficulty
      if (score % 5 === 0) {
        scrollSpeed = Math.min(
          MAX_SCROLL_SPEED,
          scrollSpeed + SCROLL_SPEED_DELTA
        );
        scrollSpeedElement.textContent = `Scroll Speed: ${scrollSpeed}`;
        pipeFrequency = Math.max(800, pipeFrequency - 100);
      }
    }

    // Remove pipes that are off screen
    if (pipes[i].x + pipes[i].width < 0) {
      pipes.splice(i, 1);
    }
  }
}

function createPipe() {
  const minHeight = 50;
  const maxHeight = canvas.height - pipeGap - minHeight;
  const topHeight =
    Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

  pipes.push({
    x: canvas.width,
    y: 0,
    width: 60,
    height: topHeight,
    color: "#4CAF50",
    passed: false,
  });

  pipes.push({
    x: canvas.width,
    y: topHeight + pipeGap,
    width: 60,
    height: canvas.height - topHeight - pipeGap,
    color: "#4CAF50",
    passed: false,
    scored: false,
  });
}

function checkCollision(player, pipe) {
  return (
    player.x < pipe.x + pipe.width &&
    player.x + player.width > pipe.x &&
    player.y < pipe.y + pipe.height &&
    player.y + player.height > pipe.y
  );
}

function draw() {
  // Clear canvas
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = player.color;
  // ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

  // Draw pipes
  pipes.forEach((pipe) => {
    ctx.fillStyle = pipe.color;
    ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
  });
}

function gameOver() {
  gameRunning = false;
  gameOverElement.style.display = "block";
  cancelAnimationFrame(animationId);
  scrollSpeed = 2;
  scrollSpeedElement.textContent = "Scroll Speed: 2";

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

// Initial draw
draw();
