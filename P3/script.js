const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const brickRowCount = 10;
const brickColumnCount = 5;

// propiedades de la pelota
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
    visible: true
  };

// propiedades de la raqueta
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    visible: true
  };

// propiedades ladrillos
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    visible: true
  };

// Creando los ladrillos
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
}

// bola en el canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
     ctx.fillStyle = ball.visible  ? '#0095dd' : 'transparent';;
    ctx.fill();
    ctx.closePath();
  }

// ladrillos en el canvas
function drawBricks() {
    bricks.forEach(column => {
      column.forEach(brick => {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.w, brick.h);
        ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
        ctx.fill();
        ctx.closePath();
      });
    });
  }

// movimiento raqueta
function movePaddle() {
    paddle.x += paddle.dx;
  
    // Detección del muro
    if (paddle.x - paddle.w > canvas.width) {
      paddle.x = canvas.width;
    }
  
    if (paddle.x < 0) {
      paddle.x = 0;
      }
  }

// movimiento pelota
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
  
    // colision de la pelota
    if (ball.x - ball.size > canvas.width){
        if (ball.x + ball.size < 0) {
        ball.dx *= -1;
        }
    }