const boardEl = document.getElementById("board");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const timerEl = document.getElementById("timer");
const submitBtn = document.getElementById("submit");
const resetBtn = document.getElementById("reset");
const playerTurnEl = document.getElementById("playerTurn");
const scoreGreenEl = document.getElementById("scoreGreen");
const scoreOrangeEl = document.getElementById("scoreOrange");

let currentPlayer = "green"; // green or orange
let timer = 60;
let interval;
let selectedCell = null;
let currentAnswer = "";

// أسئلة كثيرة بدون تكرار
const questions = [
  {q:"شيء يلبسونه في الصيف ويبدأ بحرف الألف", a:"أقلام؟", correct:"أقنعة"},
  {q:"اسم حيوان يبدأ بحرف الباء", a:"بقرة", correct:"بقرة"},
  {q:"شيء يؤكل ويبدأ بحرف التاء", a:"تفاح", correct:"تفاح"},
  {q:"اسم دولة يبدأ بحرف الجيم", a:"جزر القمر", correct:"جزر القمر"},
  {q:"شيء يستخدم للكتابة ويبدأ بحرف الحاء", a:"حبر", correct:"حبر"},
  {q:"اسم مدينة تبدأ بحرف الخاء", a:"خميس مشيط", correct:"خميس مشيط"},
  {q:"شيء أخضر ويبدأ بحرف الدال", a:"دراجة", correct:"دراجة"},
  {q:"شيء حلو ويبدأ بحرف الراء", a:"رمان", correct:"رمان"},
  {q:"شيء يطير ويبدأ بحرف الزاي", a:"زرافة", correct:"زرافة"},
  {q:"اسم نبات يبدأ بحرف السين", a:"سنبلة", correct:"سنبلة"},
  {q:"شيء يصنع من الخشب ويبدأ بحرف الشين", a:"شجرة", correct:"شجرة"},
  {q:"اسم شيء نستخدمه في البيت ويبدأ بحرف الصاد", a:"صابون", correct:"صابون"},
  {q:"اسم حيوان يبدأ بحرف الضاد", a:"ضفدع", correct:"ضفدع"},
  {q:"شيء يكتب به ويبدأ بحرف الطاء", a:"طباعة", correct:"طابعة"},
  {q:"شيء موجود في المطبخ ويبدأ بحرف الظاء", a:"ظرف", correct:"ظرف"},
  {q:"اسم فاكهة تبدأ بحرف العين", a:"عنب", correct:"عنب"},
  {q:"شيء يستخدم في البناء ويبدأ بحرف الغين", a:"غرفة", correct:"غرفة"},
  {q:"اسم شيء يبدأ بحرف الفاء ويستخدم في الطبخ", a:"فلفل", correct:"فلفل"},
  {q:"شيء يكتب به ويبدأ بحرف القاف", a:"قلم", correct:"قلم"},
  {q:"اسم نبات يبدأ بحرف الكاف", a:"كرز", correct:"كرز"},
  {q:"اسم شيء يبدأ بحرف اللام ويستخدم في المدرسة", a:"لوح", correct:"لوح"},
  {q:"اسم شيء يبدأ بحرف الميم ويستخدم في الرياضة", a:"مضرب", correct:"مضرب"},
  {q:"شيء يلبسونه ويبدأ بحرف النون", a:"نظارة", correct:"نظارة"},
  {q:"اسم شيء يبدأ بحرف الهاء ويستخدم في السفر", a:"هاتف", correct:"هاتف"},
  {q:"اسم شيء يبدأ بحرف الواو ويستخدم في الكتابة", a:"ورق", correct:"ورق"},
  {q:"اسم شيء يبدأ بحرف الياء ويستخدم في المنزل", a:"يخت", correct:"يمامة"}
];

let usedQuestions = [];

function randLetter(){
  return "ابتثجحخدذرزسشصضطظعغفقكلمنهوي"[Math.floor(Math.random()*28)];
}

function createBoard(){
  boardEl.innerHTML = "";
  for(let r=0;r<6;r++){
    const row = document.createElement("div");
    row.classList.add("row");
    for(let c=0;c<6;c++){
      const cell = document.createElement("div");
      cell.classList.add("cell");
      const letter = randLetter();
      cell.textContent = letter;
      cell.dataset.letter = letter;
      cell.addEventListener("click", ()=>selectCell(cell));
      row.appendChild(cell);
    }
    boardEl.appendChild(row);
  }
}

function selectCell(cell){
  selectedCell = cell;
  const letter = cell.dataset.letter;
  const q = getQuestion(letter);
  currentAnswer = q.correct;
  questionEl.textContent = q.q;
  answerEl.value = "";
  answerEl.focus();
}

function getQuestion(letter){
  // يجيب سؤال عشوائي بدون تكرار
  const filtered = questions.filter(x => x.q.includes(letter) || x.correct.startsWith(letter));
  let q = filtered[Math.floor(Math.random()*filtered.length)];

  // لو خلصت الأسئلة
  if(!q){
    usedQuestions = [];
    return getQuestion(letter);
  }

  // لو السؤال مستخدم
  while(usedQuestions.includes(q.q)){
    q = filtered[Math.floor(Math.random()*filtered.length)];
    if(!q){
      usedQuestions = [];
      return getQuestion(letter);
    }
  }

  usedQuestions.push(q.q);
  return q;
}

function switchPlayer(){
  currentPlayer = currentPlayer === "green" ? "orange" : "green";
  playerTurnEl.textContent = currentPlayer === "green" ? "اللاعب: أخضر" : "اللاعب: برتقالي";
  startTimer();
}

function startTimer(){
  clearInterval(interval);
  timer = 60;
  timerEl.textContent = timer;
  interval = setInterval(()=>{
    timer--;
    timerEl.textContent = timer;
    if(timer<=0){
      clearInterval(interval);
      switchPlayer();
    }
  },1000);
}

submitBtn.addEventListener("click", ()=>{
  if(!selectedCell) return;
  const ans = answerEl.value.trim();
  if(ans === currentAnswer){
    selectedCell.classList.add(currentPlayer);
    selectedCell.removeEventListener("click", ()=>selectCell(selectedCell));

    if(currentPlayer === "green"){
      scoreGreenEl.textContent = Number(scoreGreenEl.textContent)+1;
    } else {
      scoreOrangeEl.textContent = Number(scoreOrangeEl.textContent)+1;
    }

    selectedCell = null;
    questionEl.textContent = "تمام! حان دور اللاعب الثاني";
    switchPlayer();
  }else{
    questionEl.textContent = "خطأ! دور اللاعب الثاني";
    switchPlayer();
  }
});

resetBtn.addEventListener("click", ()=>{
  createBoard();
  usedQuestions = [];
  selectedCell = null;
  scoreGreenEl.textContent = "0";
  scoreOrangeEl.textContent = "0";
  questionEl.textContent = "اختَر خلية عشان يطلع السؤال";
  currentPlayer = "green";
  playerTurnEl.textContent = "اللاعب: أخضر";
  startTimer();
});

createBoard();
startTimer();
