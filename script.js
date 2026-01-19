const boardEl = document.getElementById("board");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const timerEl = document.getElementById("timer");
const submitBtn = document.getElementById("submit");
const resetBtn = document.getElementById("reset");

const letters = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي".split("");

const qa = {
  "ا":"أسد",
  "ب":"بطيخ",
  "ت":"تركيا",
  "ث":"ثلاجة",
  "ج":"جمل",
  "ح":"حصان",
  "خ":"خروف",
  "د":"دب",
  "ذ":"ذئب",
  "ر":"رمان",
  "ز":"زيت",
  "س":"سمك",
  "ش":"شمعة",
  "ص":"صقر",
  "ض":"ضفدع",
  "ط":"طائرة",
  "ظ":"ظرف",
  "ع":"عنب",
  "غ":"غزال",
  "ف":"فيل",
  "ق":"قلم",
  "ك":"كتاب",
  "ل":"ليمون",
  "م":"موز",
  "ن":"نمر",
  "ه":"هاتف",
  "و":"وردة",
  "ي":"يمامة"
};

let selectedCell = null;
let currentAnswer = "";
let timer = 60;
let interval;

function randLetter(){
  return letters[Math.floor(Math.random()*letters.length)];
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
  currentAnswer = qa[letter];
  questionEl.textContent = `سؤال: اكتب كلمة تبدأ بحرف "${letter}" (الجواب الصحيح واحد فقط)`;
  answerEl.value = "";
  answerEl.focus();
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
      alert("انتهى الوقت!");
    }
  },1000);
}

submitBtn.addEventListener("click", ()=>{
  if(!selectedCell){
    alert("اختَر خلية أولًا!");
    return;
  }
  if(answerEl.value.trim() === currentAnswer){
    selectedCell.classList.add("green");
    selectedCell = null;
    questionEl.textContent = "تمام! اختَر خلية ثانية";
    answerEl.value = "";
  }else{
    alert("خطأ، جرّب مرة ثانية.");
  }
});

resetBtn.addEventListener("click", ()=>{
  createBoard();
  startTimer();
  questionEl.textContent = "اختَر خلية عشان يطلع السؤال";
  answerEl.value = "";
  selectedCell = null;
});

createBoard();
startTimer();
