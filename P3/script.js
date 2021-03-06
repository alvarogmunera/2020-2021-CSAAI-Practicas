const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const brickRowCount = 14;
const brickColumnCount = 5;

var vidas = 3;
let score = 0;
const delay = 500;

// propiedades de la pelota
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 8,
    speed: 4,
    dx: 4,
    dy: -4,
    visible: true
  };

// propiedades de la raqueta
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 20,
    speed: 8,
    dx: 0,
    visible: true
  };

// propiedades ladrillos
const brickInfo = {
    w: 50,
    h: 30,
    padding: 5,
    offsetX: 17,
    offsetY: 40,
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
     ctx.fillStyle = ball.visible  ? '#000000' : 'transparent';;
    ctx.fill();
    ctx.closePath();
  }

// raqueta en canvas
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = paddle.visible ? '#000000' : 'transparent';
    ctx.fill();
    ctx.closePath();
  }

// score en canvas
function drawScore() {
    ctx.font = '30px TimesNewRoman';
    ctx.fillText(`Score: ${score}`, canvas.width - 700, 30);
  }

  // vidas en canvas
function drawVidas() {
  ctx.font = '30px TimesNewRoman';
  ctx.fillText(`vidas: ${vidas}`, canvas.width - 200, 30);
}

// ladrillos en el canvas
function drawBricks() {
    bricks.forEach(column => {
      column.forEach(brick => {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.w, brick.h);
        ctx.fillStyle = brick.visible ? '#000000' : 'transparent';
        ctx.fill();
        ctx.closePath();
      });
    });
  }

// movimiento raqueta
function movePaddle() {
    paddle.x += paddle.dx;
  
    // Detección del muro
    if (paddle.x + paddle.w > canvas.width) {
      paddle.x = canvas.width - paddle.w;
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
        ball.dx *= -1;
    }

    // colision de la pelota con el muro (arriba y abajo)
    if (ball.y + ball.size > canvas.height ){
    ball.dy *= -1;
    vidas += -1;
    }else if (ball.y - ball.size < 0){
      ball.dy *= -1;
    }

    // colision con la raqueta
    if (ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed;
    }


    // Colision con los ladrillos
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (ball.x - ball.size > brick.x && ball.x + ball.size < brick.x + brick.w &&
                ball.y + ball.size > brick.y && ball.y - ball.size < brick.y + brick.h) {
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseScore();
                }
            }
        });
    });
}

// incrementar score
function increaseScore() {
    score++;
  
    if (score % (brickRowCount * brickColumnCount) === 0) {
  
        ball.visible = false;
        paddle.visible = false;
  
        setTimeout(function () {
            showAllBricks();
            score = 0;
            paddle.x = canvas.width / 2 - 40;
            paddle.y = canvas.height - 20;
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.visible = true;
            paddle.visible = true;
        },delay)
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
    document.getElementById("gameover").style.display="none";
    document.getElementById("fracaso").style.display="none";
    document.getElementById("fracaso2").style.display="none";
  
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    drawVidas();
    if(vidas == 0) {
      document.getElementById("canvas").style.display="none";
      document.getElementById("instrucciones1").style.display="none";
      document.getElementById("instrucciones2").style.display="none";
      document.getElementById("instrucciones").style.display="none";
      document.getElementById("bienvenida").style.display="none";
      document.getElementById("fracaso").style.display="inline-block";
      document.getElementById("fracaso2").style.display="inline-block";
      document.getElementById("gameover").style.display="inline-block";
      console.log("fuera");
    }
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