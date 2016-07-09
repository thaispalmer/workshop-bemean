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

// Podemos encontrar todas as entradas utilizando o Model.find()
// ou então Model.findOne() para apenas um.
Beer.find({}, (err, data) => {
    if (err){
        console.log('Erro: ', err);
    }else{
        console.log('Listagem: ', data);
    }
    process.exit(0); // Apenas para encerrar o loop
});