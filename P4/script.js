console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const img = document.getElementById('imagen');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
const deslizador1 = document.getElementById('deslizadorr');
const deslizador2 = document.getElementById('deslizadorg');
const deslizador3 = document.getElementById('deslizadorb');
//-- Valor del deslizador
const range_value_red = document.getElementById('range_value_red');
const range_value_blue = document.getElementById('range_value_blue');
const range_value_green = document.getElementById('range_value_green');

const grises = document.getElementById('gris');
const colors = document.getElementById('color');
//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

    //-- Se establece como tamaño del canvas el mismo
    //-- que el de la imagen original
    canvas.width = img.width;
    canvas.height = img.height;
  
    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);
  
    console.log("Imagen lista...");
  };