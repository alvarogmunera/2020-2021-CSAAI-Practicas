const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const brickRowCount = 10;
const brickColumnCount = 5;

let score = 0;

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
    w: 50,
    h: 10,
    speed: 8,
    dx: 0,
    visible: true
  };

// propiedades ladrillos
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
  };

// Creando los ladrillos
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// bola en el canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
     ctx.fillStyle = ball.visible  ? '#0095dd' : 'transparent';;
    ctx.fill();
    ctx.closePath();
  }

// raqueta en canvas
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = paddle.visible ? '#0095dd' : 'transparent';
    ctx.fill();
    ctx.closePath();
  }

// score en canvas
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
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

// Actualizar canvas
function update() {
    movePaddle();
    moveBall();
  
    draw();
  
    requestAnimationFrame(update);
  }

  update();

  // evento tecla down
function keyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      paddle.dx = -paddle.speed;
    }
  }
  
  // evento tecla up
  function keyUp(e) {
    if (
      e.key === 'Right' ||
      e.key === 'ArrowRight' ||
      e.key === 'Left' ||
      e.key === 'ArrowLeft'
    ) {
      paddle.dx = 0;
    }
  }
  
  // Keyboard event handlers
  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);