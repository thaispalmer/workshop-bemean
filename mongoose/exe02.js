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

// Criamos um model e seu schema
const Cat = mongoose.model('Cat', { name: String });

// Instanciamos um novo model
var kitty = new Cat({ name: 'Osvaldinho' });

// E então salvamos na collection
kitty.save(function (err, data) {
    if (err){
        console.log('Erro: ', err);
    }
    console.log('meow', data);
});