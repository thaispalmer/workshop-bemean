// Carregando módulo file-system
var fs = require("fs");

console.log("Vou ler", Date.now());
console.time("leitura"); // Inicia a contagem de tempo

// Faz a leitura de maneira síncrona do arquivogrande.zip
var file = fs.readFileSync("arquivogrande.zip");
console.log(file);

console.timeEnd("leitura"); // Finaliza a contagem de tempo
console.log("Ja li", Date.now());