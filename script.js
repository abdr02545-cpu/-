const BOARD_SIZE = 6;
const TURN_TIME = 60;

let board = [];
let currentPlayer = "green";
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

// ========== أصوات باستخدام WebAudio ==========
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq, duration = 0.1, type = "sine") {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
  osc.stop(audioCtx.currentTime + duration);
}

function soundSelect() { playTone(440, 0.08, "square"); }
function soundCorrect() { playTone(880, 0.12, "triangle"); }
function soundWrong() { playTone(220, 0.2, "sawtooth"); }
function soundWin() { playTone(1200, 0.2, "sine"); playTone(1000, 0.2, "sine"); }
function soundTimeOut() { playTone(150, 0.4, "square"); }

// ========== أسئلة عشوائية بدون تكرار ==========
function generateQuestion(letter) {
  const templates = [
    `اكتب شيء يبدأ بحرف ${letter}`,
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

// ========== بناء اللوحة ==========
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
  soundSelect();
}

function updateTurnText() {
  turnEl.textContent = `دور: ${currentPlayer === "green" ? "🟩 لاعب أخضر" : "🟧 لاعب برتقالي"}`;
}

function resetTimer() {
  clearInterval(interval);
  timer = TURN_TIME;
  timerEl.textContent = timer;
  interval = setInterval(() => {
    timer--;
    timerEl.textContent = timer;
    if (timer <= 0) {
      soundTimeOut();
      switchPlayer();
    }
  }, 1000);
}

function switchPlayer() {
  if (selectedCell !== null) {
    document.querySelector(`.cell[data-index="${selectedCell}"]`).classList.remove("selected");
    selectedCell = null;
  }
  currentPlayer = currentPlayer === "green" ? "orange" : "green";
  updateTurnText();
  questionEl.textContent = "";
  resetTimer();
}

function checkWin(player) {
  const grid = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    grid[r] = [];
    for (let c = 0; c < BOARD_SIZE; c++) {
      grid[r][c] = board[r * BOARD_SIZE + c].owner;
    }
  }

  // الأخضر: فوق لتحت
  if (player === "green") {
    const visited = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(false));
    const queue = [];
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (grid[0][c] === "green") {
        queue.push([0, c]);
        visited[0][c] = true;
      }
    }
    while (queue.length) {
      const [r, c] = queue.shift();
      if (r === BOARD_SIZE - 1) return true;
      const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && !visited[nr][nc] && grid[nr][nc] === "green") {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
    return false;
  }

  // البرتقالي: يمين لليسار
  if (player === "orange") {
    const visited = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(false));
    const queue = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      if (grid[r][BOARD_SIZE - 1] === "orange") {
        queue.push([r, BOARD_SIZE - 1]);
        visited[r][BOARD_SIZE - 1] = true;
      }
    }
    while (queue.length) {
      const [r, c] = queue.shift();
      if (c === 0) return true;
      const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && !visited[nr][nc] && grid[nr][nc] === "orange") {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
    return false;
  }
}

function submitWord() {
  if (selectedCell === null) return alert("اختَر خلية أولًا!");
  const word = wordInput.value.trim();
  if (!word) return alert("اكتب كلمة!");

  const letter = board[selectedCell].letter;
  if (word[0] !== letter) {
    soundWrong();
    return alert(`الكلمة لازم تبدأ بحرف "${letter}"`);
  }

  board[selectedCell].owner = currentPlayer;
  const cellEl = document.querySelector(`.cell[data-index="${selectedCell}"]`);
  cellEl.classList.add(currentPlayer);
  cellEl.classList.remove("selected");
  selectedCell = null;
  wordInput.value = "";
  questionEl.textContent = "";
  soundCorrect();

  if (checkWin(currentPlayer)) {
    clearInterval(interval);
    soundWin();
    return alert(`${currentPlayer === "green" ? "🟩 لاعب أخضر" : "🟧 لاعب برتقالي"} فاز!`);
  }

  switchPlayer();
}

submitBtn.addEventListener("click", submitWord);
resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  currentPlayer = "green";
  updateTurnText();
  createBoard();
  resetTimer();
});

createBoard();
resetTimer();
updateTurnText();
