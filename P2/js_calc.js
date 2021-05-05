console.log("Ejecutando JS...");

del= document.getElementById('delet')
clear = document.getElementById("reset")
punto = document.getElementById("punto")
raiz = document.getElementById('sqrt')
igual = document.getElementById("igual")

let digitos = document.getElementsByClassName("num");
let operacion = document.getElementsByClassName("operacion");

const ESTADO = {
  INIT: 0,
  OP1: 1,
  OPERATION: 2,
  OP2: 3,

}

let digitos = document.getElementsByClassName("num");
let operacion = document.getElementsByClassName("operacion");
let estado = ESTADO.INIT;   

for(i=0; i<digitos.length; i++){
  digitos[i].onclick=(ev)=>{
      digito(ev.target.value);
  }
}

for (i=0; i<operacion.length; i++){
  operacion[i].onclick = (ev)=> {
    if(estado == ESTADO.OP1){
      operaciones(ev.target.value);
      console.log(`ESTADO ${estado}`);
      ESTADO.COMA = true;
    }
  }
}