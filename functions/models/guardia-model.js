const mongoose = require('mongoose');

const gardiaSchema = new mongoose.Schema({
  id: Number,
  data: String,
  n_hores: Number,
  festiu: Number,
  motiu: Number,
  user: String
});
const Guardia = mongoose.model('Guardia', gardiaSchema);

module.exports = { Guardia };