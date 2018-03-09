const fetch = require("node-fetch");
function busca_e_filtra(url_base) {


  const dados = fetch(url_base + "/data").then(e => e.json());

  const array = dados.then(valor => fetch(url_base + "/" + valor.recurso).then(e => e.json()).then(lista => lista.filter(k => k >= valor.minimo && k <= valor.maximo)));


  array.then(valor => console.log(valor));
  
}


busca_e_filtra("http://www.dsc.ufcg.edu.br/~dalton/prog3/caso1");
