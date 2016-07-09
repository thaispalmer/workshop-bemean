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

// Consulta para buscar no banco
var query = {name: /budweiser/i};

// As mudanças a serem realizadas
var mod = {alcohol: 99};

// Configurações opcionais
var optional = {
    upsert: false,  // Caso a entrada não exista no banco, inserir (default false)
    multi: true     // Para realizar em todos os resultados encontrados (default false)
};

// Utilizamos o Model.update() para atualizar os dados de uma ou mais entradas
Beer.update(query, mod, optional, (err, data)  => {
    if (err){
        console.log('Erro: ', err);
    }
    else{
        console.log('Cerveja atualizada com sucesso', data);
    }
    process.exit(0);
});