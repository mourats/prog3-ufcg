const fetch = require("node-fetch");
function busca_e_filtra(url_base) {

  const dados = fetch(url_base + "/data");
  
  const array = dados.then(e => e.json()).then(valor => fetch(url_base + "/" + valor.recurso).then(e => e.json()).then(lista => lista.filter(k => k >= valor.minimo && k <= valor.maximo)));
  
  const promise = new Promise(resolve => array.then(valor => resolve(valor)));
   
  return promise;
  
}


busca_e_filtra("http://www.dsc.ufcg.edu.br/~dalton/prog3/caso1");
