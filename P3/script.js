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
  
    // colision de la pelota con el muro(dcha e izq)
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1; // ball.dx = ball.dx * -1
    }

    // colision de la pelota con el muro (arriba y abajo)
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
    }

    // colision con la raqueta
    if (
        ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed;
        }


    // Colision con los ladrillos
    bricks.forEach(column => {
    column.forEach(brick => {
        if (brick.visible) {
        if (
            ball.x - ball.size > brick.x &&
            ball.x + ball.size < brick.x + brick.w &&
            ball.y + ball.size > brick.y &&
            ball.y - ball.size < brick.y + brick.h
        ) {
            ball.dy *= -1;
                brick.visible = false;
        }
        }
    });
    });

    // Perder
    if (ball.y + ball.size > canvas.height) {
        showAllBricks();
        }
}

// Aparecer los ladrillos
function showAllBricks() {
    bricks.forEach(column => {
      column.forEach(brick => (brick.visible = true));
    });
  }

  // Dibujar
function draw() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    drawBall();
    drawPaddle();
    drawBricks();
  }

  // Actualizar canvas
function update() {
    movePaddle();
    moveBall();
  
    // Draw everything
    draw();
  
    requestAnimationFrame(update);
  }