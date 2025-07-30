const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const PADDLE_WIDTH = 12;
const BALL_RADIUS = 10;
const MAX_SCORE = 5;

let isRunning = false;

let difficulty = {
  ballSpeed: 6,
  aiSpeed: 4,
  paddleHeight: 100
};

let player = {
  x: 0,
  y: HEIGHT / 2,
  width: PADDLE_WIDTH,
  height: difficulty.paddleHeight,
  score: 0
};

let ai = {
  x: WIDTH - PADDLE_WIDTH,
  y: HEIGHT / 2,
  width: PADDLE_WIDTH,
  height: difficulty.paddleHeight,
  score: 0
};

let ball = {
  x: WIDTH / 2,
  y: HEIGHT / 2,
  vx: difficulty.ballSpeed,
  vy: difficulty.ballSpeed,
  radius: BALL_RADIUS
};

const startBtn = document.getElementById('startBtn');
const difficultyControls = document.getElementById('difficultyControls');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const gameOverText = document.getElementById('gameOverText');
const restartBtn = document.getElementById('restartBtn');

// Initial UI state: show only Start Game
window.onload = () => {
  startBtn.style.display = 'inline-block';
  difficultyControls.style.display = 'none';
};

// Start Game button logic
startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  difficultyControls.style.display = 'flex';
});

// Difficulty selection logic
document.querySelectorAll('.difficulty').forEach(btn => {
  btn.addEventListener('click', () => {
    const level = btn.getAttribute('data-level');
    if (level === 'easy') {
      difficulty = { ballSpeed: 4, aiSpeed: 2, paddleHeight: 120, mistakeChance: 0.35 };
    } else if (level === 'medium') {
      difficulty = { ballSpeed: 6, aiSpeed: 4, paddleHeight: 100, mistakeChance: 0.15 };
    } else if (level === 'hard') {
      difficulty = { ballSpeed: 8, aiSpeed: 6, paddleHeight: 80, mistakeChance: 0.03 };
    }
    player.height = difficulty.paddleHeight;
    ai.height = difficulty.paddleHeight;
    player.score = 0;
    ai.score = 0;
    resetBall();

    difficultyControls.style.display = 'none';
    isRunning = true;
    game();
  });
});

canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  let mouseY = e.clientY - rect.top;
  player.y = mouseY - player.height / 2;
  if (player.y < 0) player.y = 0;
  if (player.y + player.height > HEIGHT) player.y = HEIGHT - player.height;
});

canvas.addEventListener('touchmove', function(e) {
  const rect = canvas.getBoundingClientRect();
  let touchY = e.touches[0].clientY - rect.top;
  player.y = touchY - player.height / 2;
  if (player.y < 0) player.y = 0;
  if (player.y + player.height > HEIGHT) player.y = HEIGHT - player.height;
}, { passive: false });

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function drawText(text, x, y, color, pulse = false) {
  ctx.fillStyle = color;
  ctx.font = pulse ? 'bold 48px Arial' : '40px Arial';
  ctx.fillText(text, x, y);
}

function resetBall() {
  ball.x = WIDTH / 2;
  ball.y = HEIGHT / 2;
  ball.vx = difficulty.ballSpeed * (Math.random() > 0.5 ? 1 : -1);
  ball.vy = difficulty.ballSpeed * (Math.random() > 0.5 ? 1 : -1);
}

function collision(paddle, ball) {
  return (
    ball.x - ball.radius < paddle.x + paddle.width &&
    ball.x + ball.radius > paddle.x &&
    ball.y + ball.radius > paddle.y &&
    ball.y - ball.radius < paddle.y + paddle.height
  );
}

function showGameOver(win) {
  gameOverText.textContent = win ? "🎉 You win!" : "💻 AI wins!";
  gameOverText.style.color = win ? "#00ffcc" : "#ff3b3b";
  gameOverOverlay.style.display = "flex";
}

restartBtn.onclick = function() {
  player.score = 0;
  ai.score = 0;
  resetBall();
  gameOverOverlay.style.display = "none";
  isRunning = true;
  game();
};

function update() {
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y - ball.radius < 0 || ball.y + ball.radius > HEIGHT) {
    ball.vy = -ball.vy;
  }

  if (collision(player, ball)) {
    ball.x = player.x + player.width + ball.radius;
    let collidePoint = ball.y - (player.y + player.height / 2);
    collidePoint /= (player.height / 2);
    let angleRad = (Math.PI / 4) * collidePoint;
    ball.vx = difficulty.ballSpeed * Math.cos(angleRad);
    ball.vy = difficulty.ballSpeed * Math.sin(angleRad);
  }

  if (collision(ai, ball)) {
    ball.x = ai.x - ball.radius;
    let collidePoint = ball.y - (ai.y + ai.height / 2);
    collidePoint /= (ai.height / 2);
    let angleRad = (Math.PI / 4) * collidePoint;
    ball.vx = -difficulty.ballSpeed * Math.cos(angleRad);
    ball.vy = difficulty.ballSpeed * Math.sin(angleRad);
  }

  if (ball.x - ball.radius < 0) {
    ai.score++;
    resetBall();
  } else if (ball.x + ball.radius > WIDTH) {
    player.score++;
    resetBall();
  }

  if (player.score === MAX_SCORE || ai.score === MAX_SCORE) {
    isRunning = false;
    showGameOver(player.score === MAX_SCORE);
    return;
  }

  // AI movement with mistake chance
  let aiCenter = ai.y + ai.height / 2;
  let targetY = ball.y;
  // Add mistake: sometimes the AI targets a wrong position
  if (Math.random() < difficulty.mistakeChance) {
    targetY += (Math.random() - 0.5) * 200; // AI "guesses" wrong
  }
  if (aiCenter < targetY - 20) {
    ai.y += difficulty.aiSpeed;
  } else if (aiCenter > targetY + 20) {
    ai.y -= difficulty.aiSpeed;
  }
  if (ai.y < 0) ai.y = 0;
  if (ai.y + ai.height > HEIGHT) ai.y = HEIGHT - ai.height;
}

function render() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.shadowColor = '#00ffcc';
  ctx.shadowBlur = 20;

  drawRect(0, 0, WIDTH, HEIGHT, '#232323');

  for (let i = 0; i < HEIGHT; i += 20) {
    drawRect(WIDTH / 2 - 1, i, 2, 10, '#fff4');
  }

  drawRect(player.x, player.y, player.width, player.height, '#fff');
  drawRect(ai.x, ai.y, ai.width, ai.height, '#fff');
  drawCircle(ball.x, ball.y, ball.radius, '#fff');
  drawText(player.score, WIDTH / 4, 60, '#fff', true);
  drawText(ai.score, WIDTH * 3 / 4 - 30, 60, '#fff', true);
}

function game() {
  if (!isRunning) return;
  update();
  render();
  requestAnimationFrame(game);
}
