const board = document.getElementById("board");
const questionEl = document.getElementById("question");
const answerInput = document.getElementById("answer");
const timerEl = document.getElementById("timer");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

const soundClick = document.getElementById("soundClick");
const soundCorrect = document.getElementById("soundCorrect");
const soundWrong = document.getElementById("soundWrong");

let timer = 60;
let interval;
let currentCell = null;
let currentAnswer = "";

// أسئلة + جواب واحد لكل حرف
const questions = {
  "أ": "أسد",
  "ب": "بدر",
  "ت": "تفاح",
  "ث": "ثعلب",
  "ج": "جمل",
  "ح": "حصان",
  "خ": "خروف",
  "د": "دب",
  "ذ": "ذهب",
  "ر": "رمان",
  "ز": "زرافة",
  "س": "سمك",
  "ش": "شمس",
  "ص": "صقر",
  "ض": "ضفدع",
  "ط": "طائر",
  "ظ": "ظبي",
  "ع": "عنب",
  "غ": "غزال",
  "ف": "فيل",
  "ق": "قلم",
  "ك": "كتاب",
  "ل": "ليمون",
  "م": "موز",
  "ن": "نمر",
  "هـ": "هلال",
  "و": "وردة",
  "ي": "يمامة"
};

// إنشاء اللوحة 6x6
const letters = Object.keys(questions);
let boardLetters = [];

for (let i = 0; i < 36; i++) {
  boardLetters.push(letters[Math.floor(Math.random() * letters.length)]);
}

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 36; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = boardLetters[i];
    cell.dataset.letter = boardLetters[i];
    cell.addEventListener("click", () => selectCell(cell));
    board.appendChild(cell);
  }
}

function selectCell(cell) {
  soundClick.play();
  currentCell = cell;
  currentAnswer = questions[cell.dataset.letter];
  questionEl.textContent = `اكتب: ${currentAnswer}`;
  answerInput.value = "";
  answerInput.focus();
}

submitBtn.addEventListener("click", () => {
  if (!currentCell) return;

  const userAnswer = answerInput.value.trim();

  if (userAnswer === currentAnswer) {
    soundCorrect.play();
    if (currentCell.dataset.player === "green") return;

    currentCell.classList.add("green");
    currentCell.dataset.player = "green";
  } else {
    soundWrong.play();
  }
});

resetBtn.addEventListener("click", () => {
  resetGame();
});

function startTimer() {
  timerEl.textContent = timer;
  interval = setInterval(() => {
    timer--;
    timerEl.textContent = timer;
    if (timer <= 0) {
      clearInterval(interval);
      alert("انتهى الوقت!");
    }
  }, 1000);
}

function resetGame() {
  clearInterval(interval);
  timer = 60;
  startTimer();
  createBoard();
  currentCell = null;
  questionEl.textContent = "";
  answerInput.value = "";
}

createBoard();
startTimer();
