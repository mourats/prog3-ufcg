/*
UFCG
Aluno: Thiago Santos de Moura - 116210967
Disciplina: Programação III
*/


function media_distancias (pontos, d){
  
  
  validos = pontos.filter(k => k[0] >= 0 && k[1] >= 0 && Math.pow(Math.pow(k[0], 2) + Math.pow(k[1], 2), 0.5) < d);
  
  result = validos.reduce((a, e) => { return a += Math.pow(Math.pow(e[0], 2) + Math.pow(e[1], 2), 0.5) }, 0);
  
  result = result/validos.length;
  
  return result;
}