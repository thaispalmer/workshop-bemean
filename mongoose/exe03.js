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

// Apenas para evitar digitar mongoose.Schema toda vez
const Schema = mongoose.Schema;

// Criando um novo schema para as cervejas
const BeerSchema = new Schema({
    name: { type: String, default: '', required: true },
    description: { type: String, default: '' },
    alcohol: { type: Number, min: 0},
    price: { type: Number, min: 0},
    category: { type: String, default: ''},
    created: { type: Date, default: Date.now }
});

// Instanciando o nosso model
const Beer = mongoose.model('Beer', BeerSchema);

// Preparando dados para inserção no banco
var dados = {
    name: 'Budweiser',
    description: 'Até que vai',
    alcohol: 5.0,
    price: 3.5,
    category: 'lager'
};

/*
// Podemos inserir os dados instanciando um novo model e usando o Model.save()
var model = new Beer(dados);
model.save(function (err, data) {
    if (err){
        console.log('Erro: ', err);
    }
    else{
        console.log('Cerveja Inserida: ', data);
    }
});
*/

// Mas é recomendado utilizar diretamente o model com o Model.create()
Beer.create(dados, function (err, data) {
    if (err){
        console.log('Erro: ', err);
    }
    else{
        console.log('Cerveja Inserida: ', data);
    }
});