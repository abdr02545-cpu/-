const BOARD_SIZE = 6;
const TURN_TIME = 30;

let board = [];
let currentPlayer = "blue";
let selectedCell = null;
let timer = TURN_TIME;
let interval;

const boardEl = document.getElementById("board");
const turnEl = document.getElementById("turn");
const timerEl = document.getElementById("timer");
const wordInput = document.getElementById("wordInput");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const questionEl = document.getElementById("question");

const letters = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي".split("");

let usedQuestions = {};

// توليد سؤال عشوائي من نماذج متعددة
function generateQuestion(letter) {
  const templates = [
    `اكتب شيء يبدأ بحرف ${letter} (مثلاً: سيارة، سمك...)`,
    `اسم حيوان يبدأ بحرف ${letter}`,
    `اسم مدينة يبدأ بحرف ${letter}`,
    `اسم فاكهة يبدأ بحرف ${letter}`,
    `شيء في البيت يبدأ بحرف ${letter}`,
    `شيء في المدرسة يبدأ بحرف ${letter}`,
    `اسم نبات يبدأ بحرف ${letter}`,
    `اسم مهنة يبدأ بحرف ${letter}`,
    `اسم لون يبدأ بحرف ${letter}`,
    `اسم أداة في المطبخ تبدأ بحرف ${letter}`,
    `اسم جهاز إلكتروني يبدأ بحرف ${letter}`,
    `اسم فيلم يبدأ بحرف ${letter}`,
    `اسم كتاب يبدأ بحرف ${letter}`,
    `اسم لعبة يبدأ بحرف ${letter}`,
    `اسم علامة مرور تبدأ بحرف ${letter}`,
    `اسم جبل أو نهر يبدأ بحرف ${letter}`,
    `اسم طائر يبدأ بحرف ${letter}`,
    `اسم عيد يبدأ بحرف ${letter}`,
    `اسم صفة تبدأ بحرف ${letter}`,
    `اسم سيارة يبدأ بحرف ${letter}`
  ];

  // يمنع التكرار
  if (!usedQuestions[letter]) usedQuestions[letter] = [];
  const remaining = templates.filter(t => !usedQuestions[letter].includes(t));
  if (remaining.length === 0) {
    usedQuestions[letter] = [];
    return generateQuestion(letter);
  }

  const q = remaining[Math.floor(Math.random() * remaining.length)];
  usedQuestions[letter].push(q);
  return q;
}

function randomLetter() {
  return letters[Math.floor(Math.random() * letters.length)];
}

function createBoard() {
  board = [];
  boardEl.innerHTML = "";
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    const letter = randomLetter();
    board.push({ letter, owner: null });

    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = letter;
    cell.dataset.index = i;
    cell.addEventListener("click", () => selectCell(i));
    boardEl.appendChild(cell);
  }
}

function selectCell(index) {
  if (board[index].owner) return;
  if (selectedCell !== null) {
    document.querySelector(`.cell[data-index="${selectedCell}"]`).classList.remove("selected");
  }
  selectedCell = index;
  document.querySelector(`.cell[data-index="${index}"]`).classList.add("selected");

  const letter = board[index].letter;
  questionEl.textContent = generateQuestion(letter);
}

function updateTurnText() {
  turnEl.textContent = `دور: ${currentPlayer === "blue" ? "🔵 لاعب 1" : "🔴 لاعب 2"}`;
}

function resetTimer() {
  clearInterval(interval);
  timer = TURN_TIME;
  timerEl.textContent = timer;
  interval = setInterval(() => {
    timer--;
    timerEl.textContent = timer;
    if (timer <= 0) {
      switchPlayer();
    }
  }, 1000);
}

function switchPlayer() {
  if (selectedCell !== null) {
    document.querySelector(`.cell[data-index="${selectedCell}"]`).classList.remove("selected");
    selectedCell = null;
  }
  currentPlayer = currentPlayer === "blue" ? "red" : "blue";
  updateTurnText();
  questionEl.textContent = "";
  resetTimer();
}

function checkWin(player) {
  const owner = player;
  const grid = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    grid[r] = [];
    for (let c = 0; c < BOARD_SIZE; c++) {
      grid[r][c] = board[r * BOARD_SIZE + c].owner;
    }
  }

  const directions = [
    [0, 1], [1, 0], [1, 1], [1, -1]
  ];

  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (grid[r][c] !== owner) continue;
      for (const [dr, dc] of directions) {
        let count = 0;
        let rr = r, cc = c;
        while (rr >= 0 && rr < BOARD_SIZE && cc >= 0 && cc < BOARD_SIZE && grid[rr][cc] === owner) {
          count++;
          rr += dr;
          cc += dc;
        }
        if (count >= 4) return true;
      }
    }
  }
  return false;
}

function submitWord() {
  if (selectedCell === null) return alert("اختَر خلية أولًا!");
  const word = wordInput.value.trim();
  if (!word) return alert("اكتب كلمة!");

  const letter = board[selectedCell].letter;
  if (word[0] !== letter) {
    return alert(`الكلمة لازم تبدأ بحرف "${letter}"`);
  }

  board[selectedCell].owner = currentPlayer;
  const cellEl = document.querySelector(`.cell[data-index="${selectedCell}"]`);
  cellEl.classList.add(currentPlayer);
  cellEl.classList.remove("selected");
  selectedCell = null;
  wordInput.value = "";
  questionEl.textContent = "";

  if (checkWin(currentPlayer)) {
    clearInterval(interval);
    return alert(`${currentPlayer === "blue" ? "🔵 لاعب 1" : "🔴 لاعب 2"} فاز!`);
  }

  switchPlayer();
}

submitBtn.addEventListener("click", submitWord);
resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  currentPlayer = "blue";
  updateTurnText();
  createBoard();
  resetTimer();
});

createBoard();
resetTimer();
updateTurnText();
