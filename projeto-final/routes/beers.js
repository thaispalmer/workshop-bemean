var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BeerSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  price: { type: Number, min: 0},
  category: { type: String, default: ''},
  created: { type: Date, default: Date.now }
});

const Beer = mongoose.model('Beer', BeerSchema);

/* GET beer listing */
router.get('/', (req, res) => {
  Beer.find({}, (err, data) => {
    if (err) throw new Error(err);
    else res.json(data);
  });
});

/* GET specific beer */
router.get('/:id', (req, res) => {
  const query = {_id: req.params.id};
  Beer.find(query, (err, data) => {
    if (err) throw new Error(err);
    else res.json(data);
  });
});

/* PUT beer new info */
router.put('/:id', (req, res) => {
  const query = {_id: req.params.id};
  var dados = req.body;
  Beer.update(query, dados, (err, data) => {
    if (err) throw new Error(err);
    else res.json(data);
  });
});

/* DELETE beer*/
router.delete('/:id', (req, res) => {
  const query = {_id: req.params.id};
  Beer.remove(query, (err, data) => {
    if (err) throw new Error(err);
    else res.json(data);
  });
});

/* POST beer */
router.post('/', (req, res) => {
  var dados = req.body;
  Beer.create(dados, (err, data) => {
    if (err) throw new Error(err);
    else res.json(data);
  });
});

module.exports = router;
