const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const myJSON = {version: 1.0, name: 'Be MEAN Natal'};

const server = http.createServer((req, res) => {
    // Definindo status OK
    res.statusCode = 200;

    // E o conteúdo da nossa resposta como application/json
    res.setHeader('Content-Type', 'application/json');

    const url = req.url;

    // Nosso roteador caseiro
    switch (req.url) {
        case '/create':
            res.end('Entrou na rota Create');
            break;

        case '/read':
            res.end(JSON.stringify(myJSON));
            break;

        case '/update':
            res.end('Entrou na rota Update');
            break;

        case '/delete':
            res.end('Entrou na rota Delete');
            break;

        default:
            res.write('Be MEAN Natal!\n');
            res.end('Entrou na rota padrao');
            break;
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});