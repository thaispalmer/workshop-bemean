const mongoose = require('mongoose');
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

var query = {name: 'Budweiser'};

// Utilizamos o Model.remove() para remover todas as entradas de uma query.
Beer.remove(query, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log('Cerveja deletada com sucesso, quantidade: ', data);
    }
});