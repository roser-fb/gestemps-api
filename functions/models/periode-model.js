const mongoose = require('mongoose');

const periodeSchema = new mongoose.Schema({
  id: Number,
  data_ini: String,
  data_fi: String,
  motiu: String,
  num_dies: Number,
  user: String
});
const Periode = mongoose.model('Periode', periodeSchema);

module.exports = { Periode };