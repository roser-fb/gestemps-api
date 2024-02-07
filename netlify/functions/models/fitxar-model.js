const mongoose = require('mongoose');

const fitxarSchema = new mongoose.Schema({
  id: Number,
  data_ini: String,
  data_fi: String,
  temps: Number,
  user: String
});
const Fitxa = mongoose.model('Fitxa', fitxarSchema);

module.exports = { Fitxa };