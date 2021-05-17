const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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