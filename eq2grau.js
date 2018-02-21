/*
UFCG
Aluno: Thiago Santos de Moura - 116210967
Disciplina: Programação III
*/

function eq2grau(eq){
  
  let a = eq.a; 
  let b = eq.b;
  let c = eq.c;
  let result = {}
  
  result.delta = Math.pow(b,2) - (4*a*c);
  
  const raiz = Math.pow(result.delta, 0.5);
  
  if(result.delta >= 0){
    result.x1 = (-b + raiz) / (2*a);
    if(result.delta > 0){
        result.x2 = (-b - raiz) / (2*a);
    }
  }
  
  return result;
}

const assert = require('assert');

assert.deepEqual(eq2grau({a:1, b:-5, c:6}), {delta: 1.0, x1: 3.0, x2: 2.0});
assert.deepEqual(eq2grau({a:2, b:8, c:-24}), {delta: 256.0, x1: 2.0, x2: -6.0});
