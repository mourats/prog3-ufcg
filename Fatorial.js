/*
UFCG
Aluno: Thiago Santos de Moura - 116210967
Disciplina: Programação III
*/

function fat(n) {
  
  function fat_aux(x, n){
    if (n ===0){
      return x;
    }else{
      return fat_aux(x*n, n-1);
    }
  }
  return fat_aux(1, n);
}

