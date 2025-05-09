document.addEventListener("DOMContentLoaded", function () {
  const easy_problems = [
    [2, 2, 8, 6],
    [2, 2, 8, 6],
    [2, 2, 8, 6],
    [2, 2, 4, 5],
    [4, 2, 8, 4],
    [8, 1, 8, 7],
    [5, 4, 4, 8],
    [8, 8, 4, 9],
    [4, 4, 8, 8],
    [1, 1, 6, 5],
    [5, 4, 7, 3],
    [7, 6, 5, 6],
    [5, 1, 9, 2],
    [6, 4, 7, 7],
    [3, 9, 2, 5],
    [8, 3, 6, 4],
    [8, 3, 4, 3],
    [4, 8, 1, 8],
    [8, 8, 5, 1],
    [3, 7, 7, 7],
    [9, 7, 8, 1],
    [2, 4, 1, 4],
    [6, 6, 6, 6],
    [9, 2, 1, 8],
    [4, 3, 2, 1],
    [3, 6, 3, 2],
    [3, 4, 2, 6],
    [8, 2, 1, 5],
    [5, 1, 5, 4],
    [6, 2, 1, 7],
    [4, 8, 5, 7],
    [9, 6, 8, 1],
    [3, 9, 6, 6],
    [8, 2, 8, 4],
    [5, 7, 5, 7],
    [6, 8, 6, 4],
    [1, 8, 5, 7],
    [1, 6, 8, 8],
    [3, 4, 1, 3],
    [7, 1, 1, 4],
    [1, 2, 2, 7],
    [6, 1, 5, 2],
    [1, 2, 1, 9],
    [7, 3, 8, 8],
    [5, 4, 5, 3],
    [8, 1, 1, 4],
    [3, 3, 5, 6],
    [2, 2, 4, 6],
  ];
  const medium_problems = [
    [2, 6, 1, 6],
    [5, 5, 1, 9],
    [2, 2, 7, 6],
    [3, 6, 1, 6],
    [2, 2, 4, 7],
    [4, 5, 8, 6],
    [3, 3, 4, 5],
    [5, 1, 7, 4],
    [7, 8, 8, 9],
    [2, 7, 6, 8],
    [3, 8, 8, 9],
    [6, 5, 6, 8],
    [2, 1, 4, 9],
    [6, 4, 4, 2],
    [6, 1, 1, 9],
    [3, 2, 7, 4],
    [5, 8, 4, 9],
    [4, 7, 2, 6],
    [6, 7, 1, 9],
    [7, 3, 1, 3],
    [8, 1, 2, 7],
    [2, 9, 5, 5],
    [6, 2, 2, 5],
    [5, 6, 9, 1],
    [4, 4, 1, 8],
    [9, 4, 4, 1],
    [2, 3, 3, 8],
    [5, 6, 4, 9],
    [3, 2, 2, 6],
    [2, 8, 2, 9],
    [6, 3, 7, 5],
    [5, 4, 3, 9],
    [5, 4, 4, 3],
    [3, 6, 6, 2],
    [4, 2, 3, 4],
    [1, 6, 5, 3],
    [5, 7, 7, 6],
    [4, 3, 4, 7],
    [3, 6, 5, 2],
    [8, 6, 6, 2],
    [2, 8, 8, 7],
    [5, 4, 4, 6],
    [3, 1, 7, 2],
    [1, 3, 8, 5],
    [8, 7, 4, 8],
    [7, 2, 2, 8],
    [5, 8, 2, 6],
    [1, 4, 3, 7],
    [7, 8, 6, 5],
    [4, 3, 2, 5],
    [6, 2, 4, 9],
    [4, 7, 2, 4],
    [2, 8, 8, 9],
    [3, 2, 5, 8],
    [8, 7, 7, 2],
    [3, 7, 7, 2],
    [4, 2, 2, 8],
    [8, 4, 2, 9],
    [4, 7, 7, 1],
    [7, 7, 2, 5],
    [4, 7, 7, 5],
    [5, 4, 3, 6],
    [3, 2, 1, 6],
    [6, 2, 1, 9],
    [7, 4, 1, 9],
    [6, 5, 3, 8],
    [8, 3, 2, 4],
    [7, 5, 1, 9],
    [5, 3, 3, 9],
    [5, 3, 1, 7],
    [6, 3, 2, 9],
    [6, 6, 3, 8],
    [6, 6, 2, 9],
    [6, 3, 1, 8],
    [3, 3, 2, 7],
    [4, 2, 1, 7],
    [7, 3, 3, 8],
    [6, 3, 1, 7],
    [6, 5, 5, 8],
    [5, 3, 1, 9],
    [6, 5, 1, 8],
    [7, 3, 2, 8],
    [6, 6, 1, 5],
    [4, 4, 1, 7],
    [4, 4, 1, 6],
    [5, 5, 3, 7],
    [4, 3, 3, 7],
    [5, 4, 2, 7],
    [5, 5, 1, 6],
    [6, 4, 2, 6],
    [8, 6, 3, 9],
    [8, 2, 1, 8],
    [7, 4, 3, 9],
    [7, 3, 1, 8],
    [3, 2, 2, 7],
    [7, 4, 2, 8],
  ];
  const hard_problems = [
    [5, 4, 2, 6],
    [6, 5, 2, 6],
    [2, 6, 8, 9],
    [8, 1, 3, 8],
    [5, 2, 9, 7],
    [6, 5, 2, 6],
    [6, 3, 2, 8],
    [4, 4, 2, 5],
    [5, 3, 3, 7],
    [5, 3, 2, 7],
    [6, 3, 3, 8],
    [2, 3, 2, 5],
    [6, 4, 1, 9],
    [6, 5, 1, 7],
    [6, 4, 1, 7],
    [9, 4, 4, 3],
    [9, 7, 2, 4],
    [8, 7, 4, 4],
    [8, 5, 2, 5],
    [8, 5, 3, 9],
    [7, 4, 3, 8],
    [8, 2, 1, 2],
    [8, 5, 2, 2],
    [2, 9, 2, 6],
    [6, 4, 2, 8],
    [7, 9, 2, 3],
    [8, 7, 5, 9],
    [8, 5, 2, 8],
    [8, 3, 2, 9],
    [3, 4, 1, 8],
    [7, 5, 5, 4],
    [3, 5, 2, 3],
    [8, 8, 5, 9],
    [7, 7, 3, 4],
    [4, 5, 1, 2],
    [6, 9, 5, 6],
    [5, 2, 2, 7],
    [6, 4, 1, 8],
    [6, 4, 1, 6],
    [5, 2, 2, 9],
    [7, 8, 3, 5],
    [9, 4, 4, 8],
    [8, 8, 7, 5],
    [8, 4, 4, 6],
    [5, 4, 2, 5],
    [6, 5, 2, 9],
    [5, 3, 3, 3],
    [5, 4, 1, 8],
    [8, 7, 2, 9],
    [6, 3, 2, 7],
  ];

  const completed_easy = [];
  const completed_medium = [];
  const completed_hard = [];

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("user_id"); // e.g., "12345"
  const chatId = urlParams.get("chat_id"); // Optional
  const messageId = urlParams.get("message_id"); // Optional
  const inlineMessageId = urlParams.get("inline_message_id"); // Optional

  const permvar = new Array(24);

  permvar[0] = new Array("w", "x", "y", "z");
  permvar[1] = new Array("w", "x", "z", "y");
  permvar[2] = new Array("w", "y", "x", "z");
  permvar[3] = new Array("w", "y", "z", "x");

  permvar[4] = new Array("w", "z", "x", "y");
  permvar[5] = new Array("w", "z", "y", "x");
  permvar[6] = new Array("x", "w", "y", "z");
  permvar[7] = new Array("x", "w", "z", "y");

  permvar[8] = new Array("x", "y", "w", "z");
  permvar[9] = new Array("x", "y", "z", "w");
  permvar[10] = new Array("x", "z", "w", "y");
  permvar[11] = new Array("x", "z", "y", "w");

  permvar[12] = new Array("y", "w", "x", "z");
  permvar[13] = new Array("y", "w", "z", "x");
  permvar[14] = new Array("y", "x", "w", "z");
  permvar[15] = new Array("y", "x", "z", "w");

  permvar[16] = new Array("y", "z", "w", "x");
  permvar[17] = new Array("y", "z", "x", "w");
  permvar[18] = new Array("z", "w", "x", "y");
  permvar[19] = new Array("z", "w", "y", "x");

  permvar[20] = new Array("z", "x", "w", "y");
  permvar[21] = new Array("z", "x", "y", "w");
  permvar[22] = new Array("z", "y", "w", "x");
  permvar[23] = new Array("z", "y", "x", "w");

  var op = new Array("*", "+", "/", "-");

  // Game settings
  const BASE_TIMER_SPEED = 550; // ms between updates (slower = faster timer)
  const MAX_SPEED_MULTIPLIER = 4; // Maximum speed increase
  const SPEED_INCREASE_RATE = 1.0 / 15.0; // How much speed increases per point
  const INITIAL_TIMER_WIDTH = 100;

  // Game state
  let numbers = [];
  let usedNumbers = [];
  let currentExpression = [];
  let solution = "";
  let startTime = null;
  let timerInterval = null;
  let score = 0;
  let currentSpeedMultiplier = 1.0;
  let timerWidth = INITIAL_TIMER_WIDTH;
  let nextRoundDelay = 2000;
  let currentDifficulty = "";
  let currentProblemIndex = -1;
  let solved = false;
  let selectedItem = null;

  const num_easy = easy_problems.length;
  const num_medium = medium_problems.length;
  const num_hard = hard_problems.length;
  const num_problems = num_easy + num_medium + num_hard;

  const easy_odds = 60;
  const medium_odds = 25;
  const hard_odds = 15;

  // DOM elements
  const cards = document.querySelectorAll(".card");
  const customCardsContainer = document.getElementById("custom-cards");
  const expressionEl = document.getElementById("expression");
  const messageEl = document.getElementById("message");
  const newGameBtn = document.getElementById("new-game");
  const giveUpBtn = document.getElementById("give-up");
  const checkBtn = document.getElementById("check");

  const clearBtn = document.getElementById("clear");
  const equalsBtn = document.getElementById("equals");
  const backspaceBtn = document.getElementById("backspace");
  const timerEl = document.getElementById("timer");
  const scoreEl = document.getElementById("score");
  const difficultyEl = document.getElementById("difficulty");
  const speedEl = document.getElementById("speed");
  const operationBtns = document.querySelectorAll(".operation[data-op]");

  // Initialize game
  newGame();

  // Event listeners
  newGameBtn.addEventListener("click", restart);
  giveUpBtn.addEventListener("click", giveUp);
  checkBtn.addEventListener("click", onCheckSolutionClicked);
  clearBtn.addEventListener("click", clearExpression);
  backspaceBtn.addEventListener("click", backspaceExpression);
  equalsBtn.addEventListener("click", onEqualsClicked);

  cards.forEach((card) => {
    card.addEventListener("click", () => onCardClicked(card));
  });

  operationBtns.forEach((btn) => {
    if (btn.id !== "clear" && btn.id !== "backspace" && btn.id !== "equals") {
      btn.addEventListener("click", () => {
        if (selectedItem) {
          const index = currentExpression.indexOf(selectedItem);
          if (index >= 0) {
            const value = btn.dataset.op;
            const type = "operator";
            currentExpression[index] = { value, type };

            console.log(`Swapping "${selectedItem.value}" with "${value}".`);
            console.log(JSON.stringify(currentExpression));

            updateExpression();
          }

          selectedItem = null;
          console.log(JSON.stringify(currentExpression));

          return;
        }

        addToExpression(btn.dataset.op, "operator");
      });
    }
  });

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function giveUp() {
    clearInterval(timerInterval);
    giveUpBtn.style.display = "none";
    timerWidth = 0;
    endGame();
  }

  function restart() {
    score = 0;
    customCardsContainer.replaceChildren();
    timerWidth = INITIAL_TIMER_WIDTH;
    giveUpBtn.style.display = "inline-block";
    timerEl.style.width = `${timerWidth}%`;
    timerEl.style.backgroundColor = "#4caf50";
    currentSpeedMultiplier = 1.0;
    newGame();
  }

  function nextRound() {
    // Calculate timer speed based on score
    currentSpeedMultiplier = Math.min(
      currentSpeedMultiplier + SPEED_INCREASE_RATE,
      MAX_SPEED_MULTIPLIER
    );
    customCardsContainer.replaceChildren();

    newGame();
  }

  // Game functions
  function newGame() {
    giveUpBtn.style.display = "inline-block";
    checkBtn.style.display = "inline-block";
    solved = false;
    customCardsContainer.replaceChildren();

    // Reset game state
    timerWidth = INITIAL_TIMER_WIDTH;
    timerEl.style.width = `${timerWidth}%`;
    timerEl.style.backgroundColor = "#4caf50";
    newGameBtn.style.display = "none";
    numbers = generateNumbers();
    usedNumbers = [];
    currentExpression = [];
    solution = findSolution(numbers);
    scoreEl.textContent = score.toString();

    // Update UI
    updateCards();
    updateExpression();
    messageEl.className = "message";
    messageEl.textContent = "";

    speedEl.textContent = currentSpeedMultiplier.toFixed(3) + "x";

    // Log solution for debugging (remove in production)
    console.log("Solution:", solution);
  }

  function countParentheses(str) {
    let openCount = 0;
    let closeCount = 0;

    for (let i = 0; i < str.length; i++) {
      if (str[i] === "(") {
        openCount++;
      } else if (str[i] === ")") {
        closeCount++;
      }
    }

    return { open: openCount, close: closeCount };
  }

  function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  function generateNumbers() {
    const n = getRandomIntInclusive(0, 100);
    let problem = [];
    let difficultyMultiplier = 1.0;

    if (n <= easy_odds) {
      currentDifficulty = "Easy";
      currentProblemIndex = Math.floor(Math.random() * easy_problems.length);
      problem = easy_problems[currentProblemIndex];
      difficultyMultiplier = 0.75;
    } else if (n <= medium_odds) {
      currentDifficulty = "Medium";
      currentProblemIndex = Math.floor(Math.random() * medium_problems.length);
      problem = medium_problems[currentProblemIndex];
      difficultyMultiplier = 1.0;
    } else {
      currentDifficulty = "Hard";
      currentProblemIndex = Math.floor(Math.random() * hard_problems.length);
      problem = hard_problems[currentProblemIndex];
      difficultyMultiplier = 1.25;
    }

    console.log(`${currentDifficulty}: ${problem}`);
    shuffle(problem);
    difficultyEl.textContent = currentDifficulty;

    // Start timer with current speed
    timerInterval = setInterval(
      updateTimer,
      (BASE_TIMER_SPEED / currentSpeedMultiplier) * difficultyMultiplier
    );

    return problem;
  }

  // function findSolution(nums) {
  //   // This is a simplified solver that checks common patterns
  //   // A complete solver would need to check all permutations and operator combinations
  //   const [a, b, c, d] = nums.sort((x, y) => x - y);

  //   // Check some common patterns
  //   if (a + b + c + d === 24) return `${a} + ${b} + ${c} + ${d}`;
  //   if (a * b * c * d === 24) return `${a} × ${b} × ${c} × ${d}`;
  //   if (a * b + c * d === 24) return `${a} × ${b} + ${c} × ${d}`;
  //   if (a * b - c * d === 24) return `${a} × ${b} - ${c} × ${d}`;
  //   if ((a + b) * (c - d) === 24) return `(${a} + ${b}) × (${c} - ${d})`;
  //   if (a * b + c * d === 24) return `(${a} × ${b}) + (${c} × ${d})`;
  //   if (a * b - c * d === 24) return `(${a} × ${b}) - (${c} × ${d})`;
  //   if ((a + b + c) * d === 24) return `(${a} + ${b} + ${c}) × ${d}`;
  //   if ((a + b) * c - d === 24) return `(${a} + ${b}) × ${c} - ${d}`;
  //   if ((a + b) * c + d === 24) return `(${a} + ${b}) × ${c} + ${d}`;

  //   // If no solution found, return a message
  //   return "No solution found for these numbers. Try a new game!";
  // }

  function findSolution(nums) {
    var w = nums[0];
    var x = nums[1];
    var y = nums[2];
    var z = nums[3];

    var sol = swap(w, x, y, z);

    sol = replace(sol[0], w, x, y, z);

    if (sol == "no solution found.") {
      return sol;
    } else {
      return sol + " = 24";
    }

    return sol;
  }

  function replace(sol, w, x, y, z) {
    sol = sol.replace("x", x);
    sol = sol.replace("y", y);
    sol = sol.replace("w", w);
    sol = sol.replace("z", z);

    sol = sol.replace("*", "×");
    sol = sol.replace("/", "÷");
    sol = sol.replace("-", "-");
    sol = sol.replace("+", "+");

    return sol;
  }

  function swap(w, x, y, z) {
    var op1, op2, op3;
    dummy = "";

    for (i = 0; i < 24; i++) {
      for (j = 0; j < 4; j++) {
        op1 = op[j];
        for (k = 0; k < 4; k++) {
          op2 = op[k];
          for (l = 0; l < 4; l++) {
            op3 = op[l];
            fu =
              permvar[i][0] +
              op1 +
              permvar[i][1] +
              op2 +
              permvar[i][2] +
              op3 +
              permvar[i][3];
            dummy += "<br/>" + replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              "(" +
              permvar[i][0] +
              op1 +
              permvar[i][1] +
              ")" +
              op2 +
              permvar[i][2] +
              op3 +
              permvar[i][3];
            dummy += "<br/>" + replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              permvar[i][0] +
              op1 +
              "(" +
              permvar[i][1] +
              op2 +
              permvar[i][2] +
              ")" +
              op3 +
              permvar[i][3];
            dummy += "<br/>" + replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              permvar[i][0] +
              op1 +
              permvar[i][1] +
              op2 +
              "(" +
              permvar[i][2] +
              op3 +
              permvar[i][3] +
              ")";
            dummy += "<br/>" + replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              "(" +
              permvar[i][0] +
              op1 +
              permvar[i][1] +
              ")" +
              op2 +
              "(" +
              permvar[i][2] +
              op3 +
              permvar[i][3] +
              ")";
            dummy += "<br/>" + replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              "(" +
              permvar[i][0] +
              op1 +
              permvar[i][1] +
              op2 +
              permvar[i][2] +
              ")" +
              op3 +
              permvar[i][3];
            dummy += "<br/>" + replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              permvar[i][0] +
              op1 +
              "(" +
              permvar[i][1] +
              op2 +
              permvar[i][2] +
              op3 +
              permvar[i][3] +
              ")";
            dummy += "<br/>" + replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              "(" +
              "(" +
              permvar[i][0] +
              op1 +
              permvar[i][1] +
              ")" +
              op2 +
              permvar[i][2] +
              ")" +
              op3 +
              permvar[i][3];
            dummy += "<br/>" + replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              permvar[i][0] +
              op1 +
              "(" +
              "(" +
              permvar[i][1] +
              op2 +
              permvar[i][2] +
              ")" +
              op3 +
              permvar[i][3] +
              ")";
            dummy += "<br/>" + replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              "(" +
              permvar[i][0] +
              op1 +
              "(" +
              permvar[i][1] +
              op2 +
              permvar[i][2] +
              ")" +
              ")" +
              op3 +
              permvar[i][3];
            dummy += "<br/>" + replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              permvar[i][0] +
              op1 +
              "(" +
              permvar[i][1] +
              op2 +
              "(" +
              permvar[i][2] +
              op3 +
              permvar[i][3] +
              ")" +
              ")";
            dummy += "<br/>" + replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }
          }
        }
      }
    }

    return ["no solution found.", dummy];
  }

  function $(e) {
    return document.getElementById(e);
  }

  function f(w, x, y, z, fu) {
    var myfunction = new Function("w", "x", "y", "z", "return " + fu + ";");
    return myfunction(w, x, y, z, fu);
  }

  function endGame() {
    checkBtn.style.display = "none";
    giveUpBtn.style.display = "none";

    clearInterval(timerInterval);
    setGameOver();

    // Add back all of the problems.
    easy_problems.push.apply(completed_easy);
    medium_problems.push.apply(completed_medium);
    hard_problems.push.apply(completed_hard);

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

  function updateTimer() {
    timerWidth -= 1;
    timerEl.style.width = `${timerWidth}%`;

    // Change color as time runs out
    if (timerWidth < 30) {
      timerEl.style.backgroundColor = "#f44336";
    } else if (timerWidth < 60) {
      timerEl.style.backgroundColor = "#FFC107";
    }

    if (timerWidth <= 0) {
      endGame("Time's up!");
    }
  }

  function updateCards() {
    cards.forEach((card, index) => {
      card.textContent = numbers[index];
      card.dataset.number = numbers[index];
      card.classList.remove("selected");
    });
  }

  function onCardClicked(card) {
    selectNumber(card.dataset.number);

    // Add to expression
    addToExpression(card.dataset.number, "number");

    // Visual feedback
    card.classList.add("clicked");
    setTimeout(() => card.classList.remove("clicked"), 400);
  }

  function swapSelectedItem(number) {
    const index = currentExpression.indexOf(selectedItem);
    if (index >= 0) {
      const value = number;
      const type = "number";
      currentExpression[index] = { value, type };

      updateExpression();
    }

    selectedItem = undefined;
    return;
  }

  function selectNumber(number) {
    if (!numbers.includes(Number.parseInt(number))) {
      console.error(`Selected unknown number or value "${number}"`);
      return;
    }

    console.log(`Selected ${number} from ${numbers} (used: ${usedNumbers})`);

    // Check if the number is already used
    const usedCount = usedNumbers.filter((n) => n == number).length;
    const totalCount = numbers.filter((n) => n == number).length;

    if (usedCount > 0 && usedCount >= totalCount) {
      showMessage(
        `You've already used all ${totalCount} ${number}s (used=${usedCount})`,
        "error"
      );
      return;
    }

    if (selectedItem) {
      swapSelectedItem(number);
    }

    usedNumbers.push(number);
  }

  function addToExpression(value, type) {
    currentExpression.push({ value, type });
    updateExpression();
  }

  function isNumeric(str) {
    if (typeof str != "string") return false; // Ensures the input is a string
    return (
      !isNaN(str) && // Use type conversion to determine if string is numeric
      !isNaN(parseFloat(str))
    );
  }

  function backspaceExpression() {
    if (currentExpression.length == 0) {
      console.log("current expression is empty");
      return;
    }

    console.log(
      `currentExpression before: ${JSON.stringify(currentExpression)}`
    );

    let last = currentExpression.pop();
    if (isNumeric(last)) {
      usedNumbers.remove(last);
    }

    console.log(
      `currentExpression after: ${JSON.stringify(currentExpression)}`
    );
    updateExpression();
  }

  function clearExpression() {
    currentExpression = [];
    usedNumbers = [];
    updateExpression();
    messageEl.className = "message";
    messageEl.textContent = "";
  }

  function setGameOver() {
    expressionEl.innerHTML = "";
    const span = document.createElement("span");
    const solution = findSolution(numbers);
    span.textContent = "Game Over! One possible solution is: ";
    expressionEl.appendChild(span);
    const br = document.createElement("br");
    expressionEl.appendChild(br);
    const solSpan = document.createElement("span");
    solSpan.textContent = solution;
    expressionEl.appendChild(solSpan);
    newGameBtn.style.display = "inline-block";
  }

  function updateExpression() {
    expressionEl.innerHTML = "";

    currentExpression.forEach((item) => {
      console.log(item);
      const span = document.createElement("span");
      span.textContent = item.value;
      span.className = `expression-item ${item.type}`;

      span.addEventListener("click", (e) => {
        if (span.classList.contains("expression-item--selected")) {
          span.classList.remove("expression-item--selected");
          selectedItem = null;
          return;
        }

        // Remove selection from all items
        document
          .querySelectorAll(".expression-item")
          .forEach((i) => i.classList.remove("expression-item--selected"));

        span.classList.add("expression-item--selected");
        selectedItem = item;
      });

      const closeButton = document.createElement("span");
      closeButton.className = "corner-btn close-btn";
      closeButton.textContent = "x";
      closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // De-select the item before closing it.
        if (span.classList.contains("expression-item--selected")) {
          span.classList.remove("expression-item--selected");
          selectedItem = null;
        }

        let index = currentExpression.indexOf(item);
        currentExpression.splice(index, 1);
        index = usedNumbers.indexOf(item.value);
        const removed = usedNumbers.splice(index, 1);

        console.log(
          `Removed number ${item.value} from used numbers: ${usedNumbers}. Removed: ${removed}`
        );

        updateExpression();
      });
      span.appendChild(closeButton);

      // const swapButton = document.createElement("span");
      // swapButton.className = "corner-btn swap-btn";
      // swapButton.textContent = "⇆";
      // swapButton.addEventListener("click", (e) => {
      //   e.preventDefault();
      //   e.stopPropagation();

      //   if (span.classList.contains("expression-item--selected")) {
      //     span.classList.remove("expression-item--selected");
      //     selectedItem = null;
      //     return;
      //   }

      //   // Remove selection from all items
      //   document
      //     .querySelectorAll(".expression-item")
      //     .forEach((i) =>
      //       i.classList.remove("expression-item--selected")
      //     );

      //   span.classList.add("expression-item--selected");
      //   selectedItem = item;
      // });
      // span.appendChild(swapButton);

      expressionEl.appendChild(span);

      if (item.type === "number") {
        if (usedNumbers.length == 4) {
          // Try adding the final closing parenthesis automatically.
          // We do this first, as the user may have already added it, which
          // will result in an error. We don't want to display that error for this check,
          // since we're the ones that added the final closing parenthesis.
          let value = ")";
          let type = "operator";
          const correct = checkSolution([
            ...currentExpression,
            { value, type },
          ]);

          if (!correct) {
            checkSolution(currentExpression);
          }
        }
      }

      console.log(usedNumbers);
    });
  }

  function onCheckSolutionClicked() {
    checkSolution(currentExpression);
  }

  function evaluateExpression(expressionToCheck) {
    // Convert the expression to a computable string
    let expr = expressionToCheck.map((item) => item.value).join(" ");

    // Replace × with * and ÷ with / for evaluation
    expr = expr.replace(/×/g, "*").replace(/÷/g, "/");

    const result = eval(expr);
    return result;

    try {
    } catch (e) {}
  }

  function onEqualsClicked() {
    if (!currentExpression) {
      return;
    }

    let result = 0;

    try {
      result = evaluateExpression(currentExpression);
    } catch (e) {
      showMessage(
        `Invalid expression. Please check your input. (Error: ${e})`,
        "error"
      );

      return;
    }

    const customCard = document.createElement("div");
    customCard.classList.add("card");
    customCard.classList.add("custom-card");
    customCard.textContent = result;
    customCard.dataset.number = result;
    customCard.dataset.numbersUsed = usedNumbers.slice();

    console.log(
      `onEqualsClicked: creating custom card with value ${result} created using the following numbers: ${usedNumbers}`
    );

    customCard.addEventListener("click", () => onCustomCardClicked(customCard));

    customCardsContainer.appendChild(customCard);

    currentExpression = [];

    const value = result;
    const type = "number";

    currentExpression.push({ value, type });

    updateExpression();

    // const value = result;
    // const type = "number";
    // currentExpression = [{value, type}];
    // updateExpression();
  }

  function onCustomCardClicked(customCard) {
    console.log(
      `onCustomCardClicked: clicked custom card ${
        customCard.dataset.number
      } created using the following numbers: ${JSON.stringify(
        customCard.dataset.numbersUsed
      )}`
    );

    Array.from(customCard.dataset.numbersUsed).forEach((val) =>
      selectNumber(val)
    );

    addToExpression(customCard.dataset.number, "number");

    currentExpression.push({ value, type });

    console.log(
      `onCustomCardClicked: current expression: "${JSON.stringify(
        currentExpression
      )}"`
    );

    // updateExpression();
  }

  function checkSolution(expressionToCheck) {
    console.log(
      `Checking solution: ${JSON.stringify(JSON.stringify(expressionToCheck))}`
    );
    if (solved) {
      return false;
    }

    if (!expressionToCheck) {
      expressionToCheck = currentExpression;
    }

    try {
      // Convert the expression to a computable string
      let expr = expressionToCheck.map((item) => item.value).join(" ");

      // Replace × with * and ÷ with / for evaluation
      expr = expr.replace(/×/g, "*").replace(/÷/g, "/");

      // Check if all numbers are used
      const usedAllNumbers = numbers.every((num) => {
        const countInNumbers = numbers.filter((n) => n == num).length;
        const countInUsed = usedNumbers.filter((n) => n == num).length;
        return countInUsed === countInNumbers;
      });

      if (!usedAllNumbers) {
        showMessage("You must use all four numbers exactly once!", "error");
        return false;
      }

      // Check if the expression is valid
      if (expr.length === 0) {
        showMessage("Please enter an expression", "error");
        return false;
      }

      const parenthesisCounts = countParentheses(expr);

      // Check for balanced parentheses
      if (parenthesisCounts.open !== parenthesisCounts.close) {
        showMessage(
          `Unbalanced parentheses (open: ${parenthesisCounts.open}, close: ${parenthesisCounts.close}) in expression "${expr}"`,
          "error"
        );
        return false;
      }

      // Evaluate the expression
      const result = eval(expr);

      // Check if the result is 24
      if (Math.abs(result - 24) < 0.0001) {
        // Allow for floating point precision
        showMessage("Congratulations! You solved it!", "success");

        if (currentDifficulty === "Easy") {
          score += 1;
          completed_easy.push(easy_problems[currentProblemIndex]);
          easy_problems.splice(currentProblemIndex, 1);
        } else if (currentDifficulty === "Medium") {
          score += 2;
          completed_medium.push(medium_problems[currentProblemIndex]);
          medium_problems.splice(currentProblemIndex, 1);
        } else {
          score += 3;
          completed_hard.push(hard_problems[currentProblemIndex]);
          hard_problems.splice(currentProblemIndex, 1);
        }

        scoreEl.textContent = score.toString();

        clearInterval(timerInterval);

        solved = true;

        setTimeout(nextRound, nextRoundDelay);

        return true;
      } else {
        showMessage(`That equals ${result}, not 24. Try again!`, "error");

        return false;
      }
    } catch (e) {
      showMessage(
        `Invalid expression. Please check your input. (Error: ${e})`,
        "error"
      );

      return false;
    }

    return false;
  }

  function showSolution() {
    showMessage(`Solution: ${solution}`, "success");
    clearInterval(timerInterval);
  }

  function showMessage(text, type) {
    messageEl.className = "message " + type;
    messageEl.textContent = text;
  }
});
