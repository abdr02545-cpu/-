const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 800;

const startScreen = document.getElementById("startScreen");
const endScreen = document.getElementById("endScreen");
const scoreEl = document.getElementById("score");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");
const shareBtn = document.getElementById("shareBtn");

let bird = { x: 100, y: 400, w: 40, h: 30, dy: 0 };
let pipes = [];
let score = 0;
let gameOver = false;
let started = false;
let gravity = 0.6;
let jump = -10;
let pipeSpeed = 2.5;

function reset() {
  bird = { x: 100, y: 400, w: 40, h: 30, dy: 0 };
  pipes = [];
  score = 0;
  gameOver = false;
  started = false;
  scoreEl.textContent = "0";
  startScreen.classList.remove("hidden");
  endScreen.classList.add("hidden");
}

function createPipe() {
  const gap = 180;
  const minHeight = 50;
  const maxHeight = canvas.height - gap - 50;
  const topHeight = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;

  pipes.push({
    x: canvas.width,
    top: { y: 0, h: topHeight },
    bottom: { y: topHeight + gap, h: canvas.height - (topHeight + gap) },
    passed: false,
  });
}

function drawBird() {
  ctx.fillStyle = "#ffdd00";
  ctx.fillRect(bird.x, bird.y, bird.w, bird.h);
}

function drawPipes() {
  ctx.fillStyle = "#2f9e44";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, pipe.top.y, 60, pipe.top.h);
    ctx.fillRect(pipe.x, pipe.bottom.y, 60, pipe.bottom.h);
  });
}

function checkCollision(pipe) {
  if (
    bird.x < pipe.x + 60 &&
    bird.x + bird.w > pipe.x &&
    (bird.y < pipe.top.h || bird.y + bird.h > pipe.bottom.y)
  ) {
    return true;
  }
  return false;
}

function update() {
  if (!started) return;

  bird.dy += gravity;
  bird.y += bird.dy;

  if (bird.y + bird.h > canvas.height || bird.y < 0) {
    gameOver = true;
  }

  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
    createPipe();
  }

  pipes.forEach(pipe => {
    pipe.x -= pipeSpeed;

    if (!pipe.passed && pipe.x + 60 < bird.x) {
      score++;
      pipe.passed = true;
      scoreEl.textContent = score;
    }

    if (checkCollision(pipe)) {
      gameOver = true;
    }
  });

  pipes = pipes.filter(pipe => pipe.x + 60 > 0);

  if (gameOver) {
    endScreen.classList.remove("hidden");
    finalScore.textContent = "النقاط: " + score;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawBird();
  drawPipes();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

canvas.addEventListener("touchstart", () => {
  if (!started) {
    started = true;
    startScreen.classList.add("hidden");
  }
  bird.dy = jump;
});

restartBtn.addEventListener("click", reset);

shareBtn.addEventListener("click", () => {
  const shareText = `لعبتي Flappy Bird، نقاطي: ${score}`;
  if (navigator.share) {
    navigator.share({ text: shareText });
  } else {
    alert("جهازك ما يدعم المشاركة 😅");
  }
});

reset();
loop();
