// Carregando módulo file-system
var fs = require("fs");

console.log("Vou ler", Date.now());
console.time("leitura"); // Inicia a contagem de tempo

// Faz a leitura de maneira assíncrona do arquivogrande.zip
fs.readFile('arquivogrande.zip', (err, data) => {
    // Esta função será executada após finalizar a leitura assíncrona
    console.log(data);
});

// Os dois comandos a seguir executarão antes do fs.readFile finalizar.
console.timeEnd("leitura"); // Finaliza a contagem de tempo
console.log("Ja li", Date.now());
