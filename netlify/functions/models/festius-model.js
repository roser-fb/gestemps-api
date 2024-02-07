const mongoose = require('mongoose');

const festiuSchema = new mongoose.Schema({
  id: Number,
  data_ini: String,
  motiu: String,
  fix: Number
});
const Festiu = mongoose.model('Festiu', festiuSchema);

module.exports = { Festiu };