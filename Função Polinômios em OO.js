/*
UFCG
Aluno: Thiago Santos de Moura - 116210967
Disciplina: Programação III

*/

function polinomios() {
  
  function polinomio(...p) {
    const valores = typeof p[0] === 'object'? p[0]: p;
    if(valores.length % 2 !== 0){return NaN}
    
    const novo = function(n){return array.reduce((a, e) =>  {return a += (e.c * Math.pow(n, e.e))}, 0)};
    
    novo.__proto__ = prototipo;
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
  
  function soma(p2) {
  
    return polinomio(this.normal().array.concat(p2.normal().array).reduce((a, e) => {return a.concat([e.c, e.e]);}, [])).normal()
  }
  
  function igual(p2) {
	return this.normal().toString() === p2.normal().toString();
  }
 
  
  function normal(){
   
	const iguais = this.array.filter(k => (igual_expo(k, this.array).length !== 0));
	let dife = this.array.filter(k => (igual_expo(k, this.array).length === 0));
	   
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
 
 
  function toString() {
    const str = this.array.reduce((a, e) => {
            if(a.length !== 0 && e.c !== 0){
              e.c < 0? a += ' - ': a += ' + ';}
            a += monomio(e.c, e.e, a.length === 0);
            return a;
          }, '');
  return str;       
  }
  
 
  const prototipo = {toString, normal, igual, soma };
  return { polinomio};
}
 
 
// construtor
const pol = polinomios().polinomio

// construção de polinomios (os comments abaixo não são a saída do toString!)
const p1 = pol(3, 2); // 3x2
const p2 = pol(5, 2, -3, 3, 10, 1, -2, 0); // 5x2 - 3x3 + 10x - 2
const p3 = pol(3, 3, 4, 1, -5, 0); // 3x3 + 4x - 5
const p4 = pol(1, 2, 2, 2); // x2 + 2x2
const p5 = pol(1, 2, -2, 2); // x2 - 2x2
const p6 = pol(0, 2, 1, 3); // x3 (mas criado a partir de 0x2 + 1x3)

// toString
console.log(p1.toString() === '3x2');
console.log(p2.toString() === '5x2 - 3x3 + 10x - 2');
console.log(p3.toString() === '3x3 + 4x - 5');
console.log(p4.toString() === 'x2 + 2x2');
console.log(p5.toString() === 'x2 - 2x2');
console.log(p6.toString() === 'x3');

// normalização
console.log(p1.normal().toString() === '3x2');
console.log(p2.normal().toString() === '-3x3 + 5x2 + 10x - 2');
console.log(p3.normal().toString() === '3x3 + 4x - 5');
console.log(p4.normal().toString() === '3x2');
console.log(p5.normal().toString() === '-x2');
console.log(p6.normal().toString() === 'x3');

// aplicação
console.log(p1(3) === 27); // 3x2 (3) = 3*3^2 == 2*9 == 27
console.log(p1(4) === 48);
console.log(p3(4) === 203);
console.log(p3(p2(2)) === 8283);
console.log(p4(4) === 48);
console.log(p4(3) === 27);

// iguais
console.log(p1.igual(p1) === true);
console.log(p1.igual(p4) === true);

// soma
console.log(p1.soma(p1).igual(pol(6, 2)));
console.log(p1.soma(p2).igual(pol(8, 2, -3, 3, 10, 1, -2, 0)));
console.log(p1.soma(p3).igual(pol(3, 3, 3, 2, 4, 1, -5, 0)));
console.log(p1.soma(p4).igual(pol(6, 2)));
console.log(p1.soma(p5).igual(pol(2, 2)));
console.log(p1.soma(p6).igual(pol(3, 2, 1, 3)));