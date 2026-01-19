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

// أسئلة كثيرة بدون تكرار (نظام: سؤال + جواب واحد)
const questions = [
  {q:"شيء يكون فوق الحصان ويبدأ بحرف س", a:"سرج"},
  {q:"شيء يكتب به ويبدأ بحرف ق", a:"قلم"},
  {q:"شيء يلبسونه في اليد ويبدأ بحرف س", a:"ساعة"},
  {q:"شيء يؤكل ويبدأ بحرف ت", a:"تفاح"},
  {q:"شيء يطير ويبدأ بحرف ط", a:"طائر"},
  {q:"شيء يفتح الباب ويبدأ بحرف م", a:"مفتاح"},
  {q:"شيء يبرد ويبدأ بحرف ث", a:"ثلاجة"},
  {q:"شيء يستخدم في النوم ويبدأ بحرف س", a:"سرير"},
  {q:"شيء يلبسونه في الرأس ويبدأ بحرف ق", a:"قبعة"},
  {q:"شيء يستخدم في الشرب ويبدأ بحرف ك", a:"كوب"},
  {q:"شيء يستخدم في الرياضة ويبدأ بحرف ك", a:"كرة"},
  {q:"شيء يضيء ويبدأ بحرف ض", a:"ضوء"},
  {q:"شيء يستخدم في السيارة ويبدأ بحرف د", a:"دركسون"},
  {q:"شيء يطبخ فيه ويبدأ بحرف ط", a:"طنجرة"},
  {q:"شيء يكتب عليه ويبدأ بحرف و", a:"ورق"},
  {q:"شيء نأكله ويبدأ بحرف ب", a:"بطيخ"},
  {q:"شيء في البيت ويبدأ بحرف ث", a:"ثريا"},
  {q:"شيء في المدرسة ويبدأ بحرف ل", a:"لوح"},
  {q:"شيء في البحر ويبدأ بحرف ح", a:"حوت"},
  {q:"شيء في الفضاء ويبدأ بحرف ك", a:"كوكب"},
  {q:"شيء في المطبخ ويبدأ بحرف ط", a:"طاسة"},
  {q:"شيء يستخدمه الطبيب ويبدأ بحرف س", a:"سم"},
  {q:"شيء في الحديقة ويبدأ بحرف ز", a:"زهرة"},
  {q:"شيء نلبسه في الشتاء ويبدأ بحرف ج", a:"جاكيت"},
  {q:"شيء نستخدمه للتنظيف ويبدأ بحرف م", a:"ممسحة"},
  {q:"شيء في المدرسة ويبدأ بحرف ك", a:"كتاب"},
  {q:"شيء في البيت ويبدأ بحرف ف", a:"فراش"},
  {q:"شيء في المطبخ ويبدأ بحرف ط", a:"طاولة"},
  {q:"شيء في السيارة ويبدأ بحرف ف", a:"فحم"},
  {q:"شيء في البحر ويبدأ بحرف س", a:"سمك"},
  {q:"شيء في الغابة ويبدأ بحرف ش", a:"شجرة"},
  {q:"شيء في الليل ويبدأ بحرف ق", a:"قمر"},
  {q:"شيء في السماء ويبدأ بحرف ن", a:"نجم"},
  {q:"شيء في البيت ويبدأ بحرف ب", a:"باب"},
  {q:"شيء في المدرسة ويبدأ بحرف م", a:"مكتب"},
  {q:"شيء في المطبخ ويبدأ بحرف ث", a:"ثوم"},
  {q:"شيء في الرياضة ويبدأ بحرف ج", a:"جري"},
  {q:"شيء في الطبيعة ويبدأ بحرف ر", a:"رمل"},
  {q:"شيء في السوق ويبدأ بحرف س", a:"سلة"},
  {q:"شيء في السيارة ويبدأ بحرف إ", a:"إطارات"},
  {q:"شيء في البيت ويبدأ بحرف ن", a:"نوافذ"},
  {q:"شيء في المدرسة ويبدأ بحرف ط", a:"طابور"},
  {q:"شيء في الطبيعة ويبدأ بحرف ص", a:"صخر"},
  {q:"شيء في البيت ويبدأ بحرف ع", a:"عصا"},
  {q:"شيء في المطبخ ويبدأ بحرف ك", a:"كنبة"},
  {q:"شيء في البيت ويبدأ بحرف هـ", a:"هاتف"},
  {q:"شيء في المدرسة ويبدأ بحرف و", a:"ورقة"},
  {q:"شيء في الطبيعة ويبدأ بحرف ذ", a:"ذئب"},
  {q:"شيء في البيت ويبدأ بحرف ظ", a:"ظرف"},
  {q:"شيء في الرياضة ويبدأ بحرف ب", a:"بدلة"},
  {q:"شيء في السوق ويبدأ بحرف ح", a:"حلوى"},
  {q:"شيء في المطبخ ويبدأ بحرف خ", a:"خبز"},
  {q:"شيء في البيت ويبدأ بحرف ل", a:"لعب"},
  {q:"شيء في المدرسة ويبدأ بحرف غ", a:"غرفة"},
  {q:"شيء في الطبيعة ويبدأ بحرف ف", a:"فصل"},
  {q:"شيء في البيت ويبدأ بحرف ك", a:"كشاف"}
];

let usedQuestions = [];
let currentLetter = "";
let currentAnswer = "";

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
  currentLetter = cell.dataset.letter;

  const q = getQuestion();
  currentAnswer = q.a;

  questionEl.textContent = q.q.replace("{letter}", currentLetter);
  answerEl.value = "";
  answerEl.focus();
}

function getQuestion(){
  // نختار سؤال عشوائي بدون تكرار
  let q = questions[Math.floor(Math.random()*questions.length)];

  while(usedQuestions.includes(q.q)){
    q = questions[Math.floor(Math.random()*questions.length)];
    if(usedQuestions.length >= questions.length){
      usedQuestions = [];
      break;
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
    questionEl.textContent = "تمام! دور اللاعب الثاني";
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
