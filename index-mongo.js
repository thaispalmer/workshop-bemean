const http = require('http');
const mongoose = require('mongoose');

const hostname = '127.0.0.1';
const port = 3000;

mongoose.connect('mongodb://localhost/bemean-natal');

const db = mongoose.connection;

db.on('error', (err) => {
    console.log('Erro de conexao.', err)
});
db.on('open', () => {
    console.log('Conexão aberta.')
});
db.on('connected', (err) => {
    console.log('Conectado')
});
db.on('disconnected', (err) => {
    console.log('Desconectado')
});

const Schema = mongoose.Schema;

const BeerSchema = new Schema({
    name: { type: String, default: '', required: true },
    description: { type: String, default: '' },
    alcohol: { type: Number, min: 0},
    price: { type: Number, min: 0},
    category: { type: String, default: ''},
    created: { type: Date, default: Date.now }
});

const Beer = mongoose.model('Beer', BeerSchema);

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    const url = req.url;
    var dados, query, mod;

    switch (req.url) {
        case '/create':
            dados = {
                name: 'Budweiser',
                description: 'Até que vai',
                alcohol: 5.0,
                price: 3.5,
                category: 'lager'
            };
            Beer.create(dados, function (err, data) {
                if (err) {
                    res.end(JSON.stringify(err));
                }
                else {
                    res.end(JSON.stringify(data));
                }
            });
            break;

        case '/read':
            Beer.find({}, function (err, data) {
                if (err){
                    res.end(JSON.stringify(err));
                }else{
                    res.end(JSON.stringify(data));
                }
            });
            break;

        case '/update':
            query = {name: 'Budweiser'};
            mod = {alcohol: 99};
            var optional = {
                upsert: false,
                multi: true
            };
            Beer.update(query, mod, optional, function (err, data) {
                if (err){
                    res.end(JSON.stringify(err));
                }
                else{
                    res.end(JSON.stringify(data));
                }
            });
            break;

        case '/delete':
            query = {name: /budweiser/i};
            Beer.remove(query, function(err, data) {
                if(err) {
                    res.end(JSON.stringify(err));
                } else {
                    res.end(JSON.stringify(data));
                }
            });
            break;

        default:
            break;
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});