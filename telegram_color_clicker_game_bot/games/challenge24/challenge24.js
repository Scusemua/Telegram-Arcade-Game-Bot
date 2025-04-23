//
//
// PROBLEM DEFINITIONS
//
//

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("user_id"); // e.g., "12345"
const chatId = urlParams.get("chat_id"); // Optional
const messageId = urlParams.get("message_id"); // Optional
const inlineMessageId = urlParams.get("inline_message_id"); // Optional

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

//
//
// SOLVER CODE
//
//

function f(w, x, y, z, fu) {
  var myfunction = new Function("w", "x", "y", "z", "return " + fu + ";");
  return myfunction(w, x, y, z, fu);
}

class Solver {
  constructor() {
    this.permvar = new Array(24);
    this.op = new Array("*", "+", "/", "-");

    this.permvar[0] = new Array("w", "x", "y", "z");
    this.permvar[1] = new Array("w", "x", "z", "y");
    this.permvar[2] = new Array("w", "y", "x", "z");
    this.permvar[3] = new Array("w", "y", "z", "x");

    this.permvar[4] = new Array("w", "z", "x", "y");
    this.permvar[5] = new Array("w", "z", "y", "x");
    this.permvar[6] = new Array("x", "w", "y", "z");
    this.permvar[7] = new Array("x", "w", "z", "y");

    this.permvar[8] = new Array("x", "y", "w", "z");
    this.permvar[9] = new Array("x", "y", "z", "w");
    this.permvar[10] = new Array("x", "z", "w", "y");
    this.permvar[11] = new Array("x", "z", "y", "w");

    this.permvar[12] = new Array("y", "w", "x", "z");
    this.permvar[13] = new Array("y", "w", "z", "x");
    this.permvar[14] = new Array("y", "x", "w", "z");
    this.permvar[15] = new Array("y", "x", "z", "w");

    this.permvar[16] = new Array("y", "z", "w", "x");
    this.permvar[17] = new Array("y", "z", "x", "w");
    this.permvar[18] = new Array("z", "w", "x", "y");
    this.permvar[19] = new Array("z", "w", "y", "x");

    this.permvar[20] = new Array("z", "x", "w", "y");
    this.permvar[21] = new Array("z", "x", "y", "w");
    this.permvar[22] = new Array("z", "y", "w", "x");
    this.permvar[23] = new Array("z", "y", "x", "w");
  }

  findSolution(nums) {
    var w = nums[0];
    var x = nums[1];
    var y = nums[2];
    var z = nums[3];

    var sol = this.swap(w, x, y, z);

    sol = this.replace(sol[0], w, x, y, z);

    if (sol == "no solution found.") {
      return sol;
    } else {
      return sol + " = 24";
    }
  }

  replace(sol, w, x, y, z) {
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

  swap(w, x, y, z) {
    var op1, op2, op3, fu;
    let dummy = "";

    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 4; j++) {
        op1 = this.op[j];
        for (let k = 0; k < 4; k++) {
          op2 = this.op[k];
          for (let l = 0; l < 4; l++) {
            op3 = this.op[l];
            fu =
              this.permvar[i][0] +
              op1 +
              this.permvar[i][1] +
              op2 +
              this.permvar[i][2] +
              op3 +
              this.permvar[i][3];
            dummy += "<br/>" + this.replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              "(" +
              this.permvar[i][0] +
              op1 +
              this.permvar[i][1] +
              ")" +
              op2 +
              this.permvar[i][2] +
              op3 +
              this.permvar[i][3];
            dummy += "<br/>" + this.replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              this.permvar[i][0] +
              op1 +
              "(" +
              this.permvar[i][1] +
              op2 +
              this.permvar[i][2] +
              ")" +
              op3 +
              this.permvar[i][3];
            dummy += "<br/>" + this.replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              this.permvar[i][0] +
              op1 +
              this.permvar[i][1] +
              op2 +
              "(" +
              this.permvar[i][2] +
              op3 +
              this.permvar[i][3] +
              ")";
            dummy += "<br/>" + this.replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              "(" +
              this.permvar[i][0] +
              op1 +
              this.permvar[i][1] +
              ")" +
              op2 +
              "(" +
              this.permvar[i][2] +
              op3 +
              this.permvar[i][3] +
              ")";
            dummy += "<br/>" + this.replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              "(" +
              this.permvar[i][0] +
              op1 +
              this.permvar[i][1] +
              op2 +
              this.permvar[i][2] +
              ")" +
              op3 +
              this.permvar[i][3];
            dummy += "<br/>" + this.replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              this.permvar[i][0] +
              op1 +
              "(" +
              this.permvar[i][1] +
              op2 +
              this.permvar[i][2] +
              op3 +
              this.permvar[i][3] +
              ")";
            dummy += "<br/>" + this.replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              "(" +
              "(" +
              this.permvar[i][0] +
              op1 +
              this.permvar[i][1] +
              ")" +
              op2 +
              this.permvar[i][2] +
              ")" +
              op3 +
              this.permvar[i][3];
            dummy += "<br/>" + this.replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              this.permvar[i][0] +
              op1 +
              "(" +
              "(" +
              this.permvar[i][1] +
              op2 +
              this.permvar[i][2] +
              ")" +
              op3 +
              this.permvar[i][3] +
              ")";
            dummy += "<br/>" + this.replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              "(" +
              this.permvar[i][0] +
              op1 +
              "(" +
              this.permvar[i][1] +
              op2 +
              this.permvar[i][2] +
              ")" +
              ")" +
              op3 +
              this.permvar[i][3];
            dummy += "<br/>" + this.replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }

            fu =
              this.permvar[i][0] +
              op1 +
              "(" +
              this.permvar[i][1] +
              op2 +
              "(" +
              this.permvar[i][2] +
              op3 +
              this.permvar[i][3] +
              ")" +
              ")";
            dummy += "<br/>" + this.replace(fu, w, x, y, z);
            if (f(w, x, y, z, fu) == 24) {
              return [fu, dummy];
            }
          }
        }
      }
    }

    return ["no solution found.", dummy];
  }
}

//
//
// GAME CODE
//
//

// Game settings
const BASE_TIMER_SPEED = 550; // ms between updates (slower = faster timer)
const MAX_SPEED_MULTIPLIER = 4; // Maximum speed increase
const SPEED_INCREASE_RATE = 1.0 / 15.0; // How much speed increases per point
const INITIAL_TIMER_WIDTH = 100;

function isNumeric(str) {
  if (typeof str != "string") return false; // Ensures the input is a string
  return (
    !isNaN(str) && // Use type conversion to determine if string is numeric
    !isNaN(parseFloat(str))
  );
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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
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

class Challenge24Game {
  constructor(document) {
    this.document = document;
    this.numbers = [];
    this.usedNumbers = [];
    this.currentExpression = [];
    this.solution = "";
    this.startTime = null;
    this.timerInterval = null;
    this.score = 0;
    this.currentSpeedMultiplier = 1.0;
    this.timerWidth = INITIAL_TIMER_WIDTH;
    this.nextRoundDelay = 2000;
    this.currentDifficulty = "";
    this.currentProblemIndex = -1;
    this.solved = false;
    this.selectedItem = null;
    this.solver = new Solver();

    this.easy_odds = 60;
    this.medium_odds = 25;
    this.hard_odds = 15;

    this.completed_easy = [];
    this.completed_medium = [];
    this.completed_hard = [];

    this.cards = document.querySelectorAll(".card");
    this.customCardsContainer = document.getElementById("custom-cards");
    this.expressionEl = document.getElementById("expression");
    this.messageEl = document.getElementById("message");
    this.newGameBtn = document.getElementById("new-game");
    this.giveUpBtn = document.getElementById("give-up");
    this.checkBtn = document.getElementById("check");

    this.clearBtn = document.getElementById("clear");
    this.equalsBtn = document.getElementById("equals");
    this.backspaceBtn = document.getElementById("backspace");
    this.timerEl = document.getElementById("timer");
    this.scoreEl = document.getElementById("score");
    this.difficultyEl = document.getElementById("difficulty");
    this.speedEl = document.getElementById("speed");
    this.operationBtns = document.querySelectorAll(".operation[data-op]");

    // Event listeners
    this.newGameBtn.addEventListener("click", () => this.restart());
    this.giveUpBtn.addEventListener("click", () => this.giveUp());
    this.checkBtn.addEventListener("click", () =>
      this.onCheckSolutionClicked()
    );
    this.clearBtn.addEventListener("click", () => this.clearExpression());
    this.backspaceBtn.addEventListener("click", () =>
      this.backspaceExpression()
    );
    this.equalsBtn.addEventListener("click", () => this.onEqualsClicked());

    this.cards.forEach((card) => {
      card.addEventListener("click", () => this.onCardClicked(card));
    });

    this.operationBtns.forEach((btn) => {
      if (btn.id !== "clear" && btn.id !== "backspace" && btn.id !== "equals") {
        btn.addEventListener("click", () => {
          if (this.selectedItem) {
            const index = currentExpression.indexOf(selectedItem);
            if (index >= 0) {
              const value = btn.dataset.op;
              const type = "operator";
              this.currentExpression[index] = { value, type };

              console.log(
                `Swapping "${this.selectedItem.value}" with "${value}".`
              );
              console.log(JSON.stringify(this.currentExpression));

              this.updateExpression();
            }

            this.selectedItem = null;
            console.log(JSON.stringify(this.currentExpression));

            return;
          }

          this.addToExpression(btn.dataset.op, "operator");
        });
      }
    });
  }

  addToExpression(value, type) {
    this.currentExpression.push({ value, type });
    this.updateExpression();
  }

  updateExpression() {
    this.expressionEl.innerHTML = "";

    this.currentExpression.forEach((item) => {
      console.log(item);
      const span = this.document.createElement("span");
      span.textContent = item.value;
      span.className = `expression-item ${item.type}`;

      span.addEventListener("click", (e) => {
        if (span.classList.contains("expression-item--selected")) {
          span.classList.remove("expression-item--selected");
          this.selectedItem = null;
          return;
        }

        // Remove selection from all items
        document
          .querySelectorAll(".expression-item")
          .forEach((i) => i.classList.remove("expression-item--selected"));

        span.classList.add("expression-item--selected");
        this.selectedItem = item;
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
          this.selectedItem = null;
        }

        let index = this.currentExpression.indexOf(item);
        this.currentExpression.splice(index, 1);
        index = this.usedNumbers.indexOf(item.value);
        const removed = this.usedNumbers.splice(index, 1);

        console.log(
          `Removed number ${item.value} from used numbers: ${this.usedNumbers}. Removed: ${removed}`
        );

        this.updateExpression();
      });

      span.appendChild(closeButton);

      this.expressionEl.appendChild(span);

      if (item.type === "number") {
        if (this.usedNumbers.length == 4) {
          // Try adding the final closing parenthesis automatically.
          // We do this first, as the user may have already added it, which
          // will result in an error. We don't want to display that error for this check,
          // since we're the ones that added the final closing parenthesis.
          let value = ")";
          let type = "operator";
          const correct = this.checkSolution([
            ...this.currentExpression,
            { value, type },
          ]);

          if (!correct) {
            this.checkSolution(this.currentExpression);
          }
        }
      }
    });
  }

  onCardClicked(card) {
    // Visual feedback
    card.classList.add("clicked");
    setTimeout(() => card.classList.remove("clicked"), 400);

    const added = this.selectNumber(card.dataset.number);

    if (added) {
      // Add to expression
      this.addToExpression(card.dataset.number, "number");
    }
  }

  swapSelectedItem(number) {
    const index = this.currentExpression.indexOf(this.selectedItem);
    if (index >= 0) {
      const value = number;
      const type = "number";
      this.currentExpression[index] = { value, type };

      this.updateExpression();
    }

    this.selectedItem = null;
    return;
  }

  onCheckSolutionClicked() {
    this.checkSolution(this.currentExpression);
  }

  clearExpression() {
    this.currentExpression = [];
    this.usedNumbers = [];
    this.updateExpression();
    this.messageEl.className = "message";
    this.messageEl.textContent = "";
  }

  backspaceExpression() {
    if (this.currentExpression.length == 0) {
      console.log("current expression is empty");
      return;
    }

    console.log(
      `currentExpression before: ${JSON.stringify(this.currentExpression)}`
    );

    let last = this.currentExpression.pop();
    if (isNumeric(last)) {
      this.usedNumbers.remove(last);
    }

    console.log(
      `currentExpression after: ${JSON.stringify(this.currentExpression)}`
    );
    this.updateExpression();
  }

  setGameOver() {
    this.expressionEl.innerHTML = "";
    const span = this.document.createElement("span");
    const solution = this.solver.findSolution(this.numbers);
    span.textContent = "Game Over! One possible solution is: ";
    this.expressionEl.appendChild(span);
    const br = document.createElement("br");
    this.expressionEl.appendChild(br);
    const solSpan = document.createElement("span");
    solSpan.textContent = solution;
    this.expressionEl.appendChild(solSpan);
    this.newGameBtn.style.display = "inline-block";
  }

  selectNumber(number) {
    if (!this.numbers.includes(Number.parseInt(number))) {
      console.error(`Selected unknown number or value "${number}"`);
      return false;
    }

    // Check if the number is already used
    const usedCount = this.usedNumbers.filter((n) => n == number).length;
    const totalCount = this.numbers.filter((n) => n == number).length;

    if (usedCount > 0 && usedCount >= totalCount) {
      this.showMessage(
        `You've already used all ${totalCount} ${number}'s (used=${usedCount}, avail=${totalCount})`,
        "error"
      );
      return false;
    }

    if (this.selectedItem) {
      this.swapSelectedItem(number);
    }

    this.usedNumbers.push(number);

    console.log(
      `Selected ${number} from ${this.numbers} (avail: ${totalCount}, used: ${this.usedNumbers})`
    );

    return true;
  }

  giveUp() {
    clearInterval(this.timerInterval);
    this.giveUpBtn.style.display = "none";
    this.timerWidth = 0;
    this.endGame();
  }

  nextRound() {
    // Calculate timer speed based on score
    this.currentSpeedMultiplier = Math.min(
      this.currentSpeedMultiplier + SPEED_INCREASE_RATE,
      MAX_SPEED_MULTIPLIER
    );
    this.customCardsContainer.replaceChildren();

    this.newGame();
  }

  // Game functions
  newGame() {
    this.giveUpBtn.style.display = "inline-block";
    this.checkBtn.style.display = "inline-block";
    this.solved = false;
    this.customCardsContainer.replaceChildren();

    // Reset game state
    this.timerWidth = INITIAL_TIMER_WIDTH;
    this.timerEl.style.width = `${this.timerWidth}%`;
    this.timerEl.style.backgroundColor = "#4caf50";
    this.newGameBtn.style.display = "none";
    this.numbers = this.generateNumbers();
    this.usedNumbers = [];
    this.currentExpression = [];
    this.solution = this.solver.findSolution(this.numbers);
    this.scoreEl.textContent = this.score.toString();

    // Update UI
    this.updateCards();
    this.updateExpression();
    this.messageEl.className = "message";
    this.messageEl.textContent = "";

    this.speedEl.textContent = this.currentSpeedMultiplier.toFixed(3) + "x";

    // Log solution for debugging (remove in production)
    console.log("Solution:", this.solution);
  }

  updateCards() {
    this.cards.forEach((card, index) => {
      card.textContent = this.numbers[index];
      card.dataset.number = this.numbers[index];
      card.classList.remove("selected");
    });
  }

  restart() {
    this.score = 0;
    this.customCardsContainer.replaceChildren();
    this.timerWidth = INITIAL_TIMER_WIDTH;
    this.giveUpBtn.style.display = "inline-block";
    this.timerEl.style.width = `${timerWidth}%`;
    this.timerEl.style.backgroundColor = "#4caf50";
    this.currentSpeedMultiplier = 1.0;
    newGame();
  }

  generateNumbers() {
    const n = getRandomIntInclusive(0, 100);
    let problem = [];
    let difficultyMultiplier = 1.0;

    if (n <= this.easy_odds) {
      this.currentDifficulty = "Easy";
      this.currentProblemIndex = Math.floor(
        Math.random() * easy_problems.length
      );
      problem = easy_problems[this.currentProblemIndex];
      difficultyMultiplier = 0.75;
    } else if (n <= this.medium_odds) {
      this.currentDifficulty = "Medium";
      this.currentProblemIndex = Math.floor(
        Math.random() * medium_problems.length
      );
      problem = medium_problems[this.currentProblemIndex];
      difficultyMultiplier = 1.0;
    } else {
      this.currentDifficulty = "Hard";
      this.currentProblemIndex = Math.floor(
        Math.random() * hard_problems.length
      );
      problem = hard_problems[this.currentProblemIndex];
      difficultyMultiplier = 1.25;
    }

    console.log(`${this.currentDifficulty}: ${problem}`);
    shuffle(problem);
    this.difficultyEl.textContent = this.currentDifficulty;

    // Start timer with current speed
    this.timerInterval = setInterval(
      this.updateTimer,
      (BASE_TIMER_SPEED / this.currentSpeedMultiplier) * difficultyMultiplier
    );

    return problem;
  }

  updateTimer() {
    if (!this.timerEl) {
      this.timerEl = this.document.getElementById("timer");
    }

    this.timerWidth -= 1;
    this.timerEl.style.width = `${this.timerWidth}%`;

    // Change color as time runs out
    if (this.timerWidth < 30) {
      this.timerEl.style.backgroundColor = "#f44336";
    } else if (this.timerWidth < 60) {
      this.timerEl.style.backgroundColor = "#FFC107";
    }

    if (this.timerWidth <= 0) {
      this.endGame("Time's up!");
    }
  }

  endGame() {
    this.checkBtn.style.display = "none";
    this.giveUpBtn.style.display = "none";

    clearInterval(this.timerInterval);
    this.setGameOver();

    // Add back all of the problems.
    easy_problems.push.apply(this.completed_easy);
    medium_problems.push.apply(this.completed_medium);
    hard_problems.push.apply(this.completed_hard);

    // POST request
    const data = {
      score: this.score,
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
    }).then((response) => response.json());
  }

  onCustomCardClicked(customCard) {
    console.log(
      `onCustomCardClicked: clicked custom card ${
        customCard.dataset.number
      } created using the following numbers: ${JSON.stringify(
        customCard.dataset.numbersUsed
      )}`
    );

    Array.from(customCard.dataset.numbersUsed).forEach((val) =>
      this.selectNumber(val)
    );

    this.addToExpression(customCard.dataset.number, "number");

    this.currentExpression.push({ value, type });

    console.log(
      `onCustomCardClicked: current expression: "${JSON.stringify(
        this.currentExpression
      )}"`
    );
  }

  showMessage(text, type) {
    this.messageEl.className = "message " + type;
    this.messageEl.textContent = text;
  }

  onEqualsClicked() {
    if (!this.currentExpression) {
      return;
    }

    let result = 0;

    try {
      result = evaluateExpression(this.currentExpression);
    } catch (e) {
      this.showMessage(
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
    customCard.dataset.numbersUsed = this.usedNumbers.slice();

    console.log(
      `onEqualsClicked: creating custom card with value ${result} created using the following numbers: ${this.usedNumbers}`
    );

    customCard.addEventListener("click", () =>
      this.onCustomCardClicked(customCard)
    );

    this.customCardsContainer.appendChild(customCard);

    this.currentExpression = [];

    const value = result;
    const type = "number";

    this.currentExpression.push({ value, type });

    this.updateExpression();
  }

  checkSolution(expressionToCheck) {
    console.log(
      `Checking solution: ${JSON.stringify(JSON.stringify(expressionToCheck))}`
    );
    if (this.solved) {
      return false;
    }

    if (!expressionToCheck) {
      expressionToCheck = this.currentExpression;
    }

    try {
      // Convert the expression to a computable string
      let expr = expressionToCheck.map((item) => item.value).join(" ");

      // Replace × with * and ÷ with / for evaluation
      expr = expr.replace(/×/g, "*").replace(/÷/g, "/");

      // Check if all numbers are used
      const usedAllNumbers = this.numbers.every((num) => {
        const countInNumbers = this.numbers.filter((n) => n == num).length;
        const countInUsed = this.usedNumbers.filter((n) => n == num).length;
        return countInUsed === countInNumbers;
      });

      if (!usedAllNumbers) {
        this.showMessage(
          "You must use all four numbers exactly once!",
          "error"
        );
        return false;
      }

      // Check if the expression is valid
      if (expr.length === 0) {
        this.showMessage("Please enter an expression", "error");
        return false;
      }

      const parenthesisCounts = countParentheses(expr);

      // Check for balanced parentheses
      if (parenthesisCounts.open !== parenthesisCounts.close) {
        this.showMessage(
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
        this.showMessage("Congratulations! You solved it!", "success");

        if (this.currentDifficulty === "Easy") {
          this.score += 1;
          this.completed_easy.push(easy_problems[this.currentProblemIndex]);
          easy_problems.splice(this.currentProblemIndex, 1);
        } else if (this.currentDifficulty === "Medium") {
          this.score += 2;
          this.completed_medium.push(medium_problems[this.currentProblemIndex]);
          medium_problems.splice(this.currentProblemIndex, 1);
        } else {
          this.score += 3;
          this.completed_hard.push(hard_problems[this.currentProblemIndex]);
          hard_problems.splice(this.currentProblemIndex, 1);
        }

        this.scoreEl.textContent = this.score.toString();

        clearInterval(this.timerInterval);

        this.solved = true;

        setTimeout(() => this.nextRound(), this.nextRoundDelay);

        return true;
      } else {
        this.showMessage(`That equals ${result}, not 24. Try again!`, "error");

        return false;
      }
    } catch (e) {
      this.showMessage(
        `Invalid expression. Please check your input. (Error: ${e})`,
        "error"
      );

      return false;
    }

    return false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  game = new Challenge24Game(document);
  game.newGame();
});
