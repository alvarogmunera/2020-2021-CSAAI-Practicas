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