/*
UFCG
Aluno: Thiago Santos de Moura - 116210967
Disciplina: Programação III
*/

function fib(n) {
  
  function fib_aux(x, y, n){
    if (n > 0){
      return fib_aux(y, y+x, n-1);
    }else{
      return x;
    }
  }
  
  return fib_aux(1, 1, n);
}