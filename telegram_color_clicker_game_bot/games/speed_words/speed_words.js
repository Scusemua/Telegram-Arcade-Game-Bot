// Common letter sequences with many possible words
const sequences = [
  "able",
  "ac",
  "act",
  "ad",
  "add",
  "aff",
  "ag",
  "ai",
  "al",
  "all",
  "als",
  "an",
  "ance",
  "and",
  "ap",
  "ar",
  "are",
  "as",
  "ass",
  "at",
  "ate",
  "ati",
  "ax",
  "be",
  "bi",
  "ble",
  "br",
  "ca",
  "ch",
  "cl",
  "co",
  "com",
  "con",
  "cou",
  "cr",
  "de",
  "des",
  "di",
  "dis",
  "do",
  "dr",
  "ea",
  "ear",
  "ed",
  "ei",
  "el",
  "em",
  "emb",
  "en",
  "enc",
  "ence",
  "ent",
  "epi",
  "equ",
  "er",
  "ers",
  "es",
  "ess",
  "est",
  "eve",
  "ex",
  "exp",
  "ext",
  "fi",
  "fo",
  "for",
  "fr",
  "ful",
  "fy",
  "ge",
  "gen",
  "gh",
  "gr",
  "gra",
  "gro",
  "ha",
  "he",
  "hi",
  "his",
  "ho",
  "hyper",
  "hypo",
  "ible",
  "ic",
  "id",
  "ide",
  "ie",
  "il",
  "im",
  "imp",
  "in",
  "inc",
  "ine",
  "ing",
  "int",
  "intra",
  "io",
  "ion",
  "ir",
  "is",
  "ise",
  "ist",
  "it",
  "ity",
  "ive",
  "ix",
  "ize",
  "la",
  "le",
  "less",
  "li",
  "lo",
  "ly",
  "ma",
  "mat",
  "me",
  "men",
  "ment",
  "mi",
  "mis",
  "mo",
  "na",
  "nce",
  "nd",
  "ne",
  "ness",
  "ng",
  "ni",
  "nik",
  "no",
  "non",
  "not",
  "nt",
  "ob",
  "oc",
  "of",
  "oid",
  "on",
  "one",
  "oo",
  "op",
  "or",
  "os",
  "ot",
  "ou",
  "our",
  "ous",
  "out",
  "ove",
  "over",
  "pe",
  "per",
  "ph",
  "pl",
  "pla",
  "po",
  "pos",
  "pr",
  "pre",
  "pro",
  "qu",
  "ra",
  "re",
  "rea",
  "rec",
  "res",
  "ri",
  "ro",
  "sc",
  "sch",
  "sci",
  "se",
  "sh",
  "si",
  "sl",
  "so",
  "sp",
  "st",
  "sta",
  "str",
  "sub",
  "sup",
  "ta",
  "te",
  "ter",
  "th",
  "tha",
  "the",
  "tho",
  "ti",
  "tin",
  "tio",
  "tion",
  "to",
  "tr",
  "tra",
  "trix",
  "ty",
  "ul",
  "ultra",
  "un",
  "und",
  "under",
  "up",
  "ur",
  "ure",
  "us",
  "usu",
  "ut",
  "ve",
  "ver",
  "wa",
  "we",
  "wh",
  "wi",
  "wit",
  "yo",
];

// Get the user ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("user_id"); // e.g., "12345"
const chatId = urlParams.get("chat_id"); // Optional
const messageId = urlParams.get("message_id"); // Optional
const inlineMessageId = urlParams.get("inline_message_id"); // Optional

// Close tooltip when clicking anywhere else on the page
document.addEventListener("click", function (event) {
  if (!event.target.closest(".info-button")) {
    document.querySelectorAll(".info-button").forEach((button) => {
      button.classList.remove("active");
    });
  }
});

let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Game settings
let BASE_TIMER_SPEED = 300; // ms between updates (lower = faster timer)
if (isMobile) {
  BASE_TIMER_SPEED = 500; // Harder to type on a phone...
}

const MAX_SPEED_MULTIPLIER = 2; // Maximum speed increase
const SPEED_INCREASE_RATE = 0.025; // How much speed increases per point
const MULTIPLIER_DECIMALS = 3;

// Game variables
let currentSpeedMultiplier = 1.0;
let score = 0;
let streak = 0;
let timeLeft = 0;
let timer;
let currentSequence = "";
let previousSequeqnce = "";
let gameActive = false;
let submitted = new Set();

// DOM elements
const sequenceDisplay = document.getElementById("sequence");
const wordInput = document.getElementById("word-input");
const scoreDisplay = document.getElementById("score");
const streakDisplay = document.getElementById("streak");
const speedDisplay = document.getElementById("speed");
const timerBar = document.getElementById("timer-bar");
const messageDisplay = document.getElementById("message");
const startBtn = document.getElementById("start-btn");

function roundUpToNearest(number, multiple) {
  return Math.ceil(number / multiple) * multiple;
}

// Initialize game
function initGame() {
  score = 0;
  streak = 0;
  submitted.clear();
  currentSpeedMultiplier = 1.0;
  updateDisplay();
  wordInput.value = "";
  messageDisplay.textContent = "";
  startBtn.textContent = "Start Game";
  gameActive = false;
  clearInterval(timer);
  timerBar.style.width = "100%";
  sequenceDisplay.textContent = "---";
  wordInput.disabled = true;
}

// Start game
function startGame() {
  initGame();
  gameActive = true;
  startBtn.textContent = "Restart Game";
  wordInput.disabled = false;
  wordInput.focus();
  nextSequence();
  startTimer();
}

// Get a random sequence
function getRandomSequence() {
  // Weight towards 3-letter sequences (70% chance)
  const useThreeLetters = Math.random() < 0.7;
  const filteredSequences = sequences.filter((seq) =>
    useThreeLetters ? seq.length === 3 : seq.length === 2
  );

  return filteredSequences[
    Math.floor(Math.random() * filteredSequences.length)
  ];
}

// Display next sequence
function nextSequence() {
  while (currentSequence == previousSequeqnce) {
    currentSequence = getRandomSequence();
  }
  previousSequeqnce = currentSequence;
  sequenceDisplay.textContent = currentSequence;
  messageDisplay.textContent = "";
}

// Start timer
function startTimer() {
  timeLeft = 100;
  updateTimerDisplay();

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft -= 1;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      timeUp();
    }
  }, BASE_TIMER_SPEED / currentSpeedMultiplier);
}

// Update timer display
function updateTimerDisplay() {
  const percentage = Math.max(0, timeLeft);
  timerBar.style.width = `${percentage}%`;

  // Change color as time runs low
  if (percentage < 30) {
    timerBar.style.backgroundColor = "#ff5252";
  } else if (percentage < 60) {
    timerBar.style.backgroundColor = "#ffb142";
  } else {
    timerBar.style.backgroundColor = "#4CAF50";
  }
}

// Time's up
function timeUp() {
  messageDisplay.textContent = "Time's up!";
  streak = 0;
  updateDisplay();
  wordInput.disabled = true;

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

// Check if word is valid
async function isValidWord(word) {
  // Check if word contains the sequence
  if (!word.toLowerCase().includes(currentSequence.toLowerCase())) {
    return false;
  }

  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  return response.ok;
}

function containsCurrentSequence(word) {
  // Check if word contains the sequence
  return word.toLowerCase().includes(currentSequence.toLowerCase());
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// Handle word submission
async function checkWord() {
  const word = wordInput.value.trim().toLowerCase();

  if (!word) return;

  const isValid = await isValidWord(word);
  const hasSequence = containsCurrentSequence(word);
  const isDuplicate = submitted.has(word);

  if (isValid && hasSequence && !isDuplicate) {
    // Correct word
    score++;
    streak++;

    submitted.add(word);

    // Reset timer
    clearInterval(timer);

    currentSpeedMultiplier = Math.min(
      roundUpToNearest(
        currentSpeedMultiplier + SPEED_INCREASE_RATE,
        SPEED_INCREASE_RATE
      ),
      MAX_SPEED_MULTIPLIER
    );

    updateDisplay();
    messageDisplay.textContent = "Correct! +1 point";
    messageDisplay.style.color = "#4CAF50";

    let increment =
      1 +
      currentSpeedMultiplier +
      Math.min(streak * 0.075, 5) +
      word.length * 0.75;

    if (currentSpeedMultiplier >= 1.5) {
      increment += getRandomFloat(0, currentSpeedMultiplier);
    }

    // Extra time for quick responses
    timeLeft = Math.min(100, timeLeft + increment);
    updateTimerDisplay();

    console.log(
      `Incrementing currentSpeedMultiplier: ${currentSpeedMultiplier} --> ${
        currentSpeedMultiplier + SPEED_INCREASE_RATE
      }`
    );

    timer = setInterval(() => {
      timeLeft -= 1;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(timer);
        timeUp();
      }
    }, BASE_TIMER_SPEED / currentSpeedMultiplier);

    // Next sequence
    wordInput.value = "";
    nextSequence();
    wordInput.focus();
  } else if (!hasSequence) {
    // Does not contain current sequence
    messageDisplay.textContent = "Word must contain the sequence!";
    messageDisplay.style.color = "#ff5252";
    streak = 0;
    updateDisplay();
    wordInput.value = "";
    wordInput.focus();
  } else if (isDuplicate) {
    // Duplicate word
    messageDisplay.textContent = `You've already entered "${word}"`;
    messageDisplay.style.color = "#ff5252";
    updateDisplay();
    wordInput.value = "";
    wordInput.focus();
  } else {
    // Invalid word
    messageDisplay.textContent = `Unknown or invalid word: ${word}`;
    messageDisplay.style.color = "#ff5252";
    streak = 0;
    updateDisplay();
    wordInput.value = "";
    wordInput.focus();
  }
}

// Update score and streak displays
function updateDisplay() {
  scoreDisplay.textContent = score;
  streakDisplay.textContent = streak;
  speedDisplay.textContent =
    currentSpeedMultiplier.toFixed(MULTIPLIER_DECIMALS) + "x";
}

// Event listeners
startBtn.addEventListener("click", startGame);

wordInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter" && gameActive) {
    await checkWord();
  }
});

// Initialize game on load
initGame();
