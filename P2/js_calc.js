console.log("Ejecutando JS...");

display = document.getElementById("display")
del= document.getElementById('delet')
clear = document.getElementById("reset")
punto = document.getElementById("punto")
sqrt = document.getElementById('sqrt')
igual = document.getElementById("igual")

const ESTADO = {
  INIT: 0,
  OP1: 1,
  OPERATION: 2,
  OP2: 3,
  COMA: false,
}

let digitos = document.getElementsByClassName("num");
let operacion = document.getElementsByClassName("operacion");
let estado = ESTADO.INIT; 
let estado_log = [];  

for(i=0; i<digitos.length; i++){
  digitos[i].onclick=(ev)=>{
      digito(ev.target.value);
  }
}

//bucle de las operaciones
for(i=0; i<operacion.length; i++){
    operacion[i].onclick = (ev) =>{
      if(estado == ESTADO.OP1){
        display.innerHTML += ev.target.value;
        estado_log.push(estado);
        estado = ESTADO.OPERATION;
        console.log(estado, "calculo"); 
      }
    }
}

//implementacion del reset
clear.onclick = () => {
    display.innerHTML = "0";
    estado = ESTADO.INIT;
    console.log(`ESTADO ${estado}`);
    ESTADO.COMA = false;
}

//implementacion de la raiz
sqrt.onclick = () => {
    display.innerHTML = Math.sqrt(display.innerHTML);
}

//implementacion del igual
igual.onclick = () => {
    display.innerHTML = eval(display.innerHTML);
    estado = ESTADO.OP1;
    console.log(`ESTADO ${estado}`);
    ESTADO.COMA = true;
}

//implementacion del delete
del.onclick = () => {
    if((display.innerHTML == '0')||(display.innerHTML == '')){
      display.innerHTML = '0';
    }else {
      display.innerHTML = display.innerHTML.slice(0,-1);
    }
}


function digito(botones)
{
    if(estado == ESTADO.INIT){
    display.innerHTML = botones;
    estado = ESTADO.OP1;
    console.log(`ESTADO ${estado}`);
  } else if (estado == ESTADO.OP1 || estado == ESTADO.OP2) {
    display.innerHTML += botones;}
    if (estado == ESTADO.OPERATION){
        display.innerHTML += botones;
        ESTADO.COMA = false;
        estado = ESTADO.OP2;
        console.log(`ESTADO ${estado}`);
    }
}

function operaciones(operacion){
    if (estado != ESTADO.OPERATION) {
      display.innerHTML += operacion;
      estado = ESTADO.OPERATION;
    }
}