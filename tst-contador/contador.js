/*UFCG
Aluno: Thiago Santos de Moura - 116210967
Disciplina: Programação III*/

var state;
var id = null;

function start(time){
  state = 'started';
  if(!id){
    id = setInterval(update, time);
   }
}

function stop(){
  state = 'stopped';
  clearInterval(id);
  id = null;
}

