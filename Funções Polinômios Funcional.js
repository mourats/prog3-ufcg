/*
UFCG
Aluno: Thiago Santos de Moura - 116210967
Disciplina: Programação III
*/

function polinomio(...p) {
  const valores = typeof p[0] === 'object'? p[0]: p;
  if(valores.length % 2 !== 0){return NaN}
  
  const novo = function(n){return array.reduce((a, e) =>  {return a += (e.c * Math.pow(n, e.e))}, 0)};
  
  const array = valores.reduce((a , e, i) => {
          if(i%2 !== 0){
          const obj = {};
          obj.c  = valores[i-1];
          obj.e =  valores[i];
          return a.concat(obj);}
          return a;
        }, []);
     
  novo.array = array;
  return novo;
}

function soma(p1, p2) {
  
  return normal(polinomio(p1.array.concat(p2.array).reduce((a, e) => {return a.concat([e.c, e.e]);}, [])))

}

function iguais(p1, p2) {
  
  return toString(normal(p1)) === toString(normal(p2));
}

function normal(poli){
 
const iguais = poli.array.filter(k => (igual_expo(k, poli.array).length !== 0));
let dife = poli.array.filter(k => (igual_expo(k, poli.array).length === 0));
   
return polinomio(dife.concat(iguais.reduce((a, e, i) => {
	const same = igual_expo(e, a).length === 0? igual_expo(e, iguais).concat(e) :[];
	if(same.length !== 0){
	const obj = {};
	obj.e =  e.e;
	obj.c  = same.reduce((s, o) => s + o.c, 0);
	return a.concat(obj);}
	return a;
}, [])).sort(function (a, b) {return b.e - a.e}).reduce((a, e) => {return a.concat([e.c, e.e]);}, []))
   
}

function igual_expo(poli, array){
   
  return  array.reduce((a, e) => {
    if(e!== poli && e.e === poli.e){ 
      return a.concat(e);} 
    return a;
   }, [])
 }

 
function monomio(coef, expo, guard) {
  if (coef === 0) return '';
  
  let coeficiente = guard? coef === 1? '' :coef < 0? '-':'':'';
  coeficiente += Math.abs(coef) !== 1? '' + Math.abs(coef): '';
  const variavel =  expo === 0 ? '' : 'x';
  const expoente = expo === 0 || expo === 1 ? '' : '' + expo;
  return coeficiente + variavel + expoente;
 }


function toString(poli) {
  const str = poli.array.reduce((a, e) => {
          if(a.length !== 0 && e.c !== 0){
            e.c < 0? a += ' - ': a += ' + ';}
          a += monomio(e.c, e.e, a.length === 0);
          return a;
        }, '');
return str;       
}


// construção de polinomios (os comments abaixo não são a saída do toString!)
const p1 = polinomio(3, 2); // 3x2
const p2 = polinomio(5, 2, -3, 3, 10, 1, -2, 0); // 5x2 - 3x3 + 10x - 2
const p3 = polinomio(3, 3, 4, 1, -5, 0); // 3x3 + 4x - 5
const p4 = polinomio(1, 2, 2, 2); // x2 + 2x2
const p5 = polinomio(1, 2, -2, 2); // x2 - 2x2
const p6 = polinomio(0, 2, 1, 3); // x3 (mas criado a partir de 0x2 + 1x3)

// toString
console.log(toString(p1) === '3x2');
console.log(toString(p2) === '5x2 - 3x3 + 10x - 2');
console.log(toString(p3) === '3x3 + 4x - 5');
console.log(toString(p4) === 'x2 + 2x2');
console.log(toString(p5) === 'x2 - 2x2');
console.log(toString(p6) === 'x3');

// normalização
console.log(toString(normal(p1)) === '3x2');
console.log(toString(normal(p2)) === '-3x3 + 5x2 + 10x - 2');
console.log(toString(normal(p3)) === '3x3 + 4x - 5');
console.log(toString(normal(p4)) === '3x2');
console.log(toString(normal(p5)) === '-x2');
console.log(toString(normal(p6)) === 'x3');

// aplicação
console.log(p1(3) === 27); // 3x2 (3) = 3*3^2 == 2*9 == 27
console.log(p1(4) === 48);
console.log(p3(4) === 203);
console.log(p3(p2(2)) === 8283);
console.log(p4(4) === 48);
console.log(p4(3) === 27);

// iguais
console.log(iguais(p1, p1) === true);
console.log(iguais(p1, p4) === true);

// soma
console.log(iguais(soma(p1, p1), polinomio(6, 2)));
console.log(iguais(soma(p1, p2), polinomio(8, 2, -3, 3, 10, 1, -2, 0)));
console.log(iguais(soma(p1, p3), polinomio(3, 3, 3, 2, 4, 1, -5, 0)));
console.log(iguais(soma(p1, p4), polinomio(6, 2)));
console.log(iguais(soma(p1, p5), polinomio(2, 2)));
console.log(iguais(soma(p1, p6), polinomio(3, 2, 1, 3)));