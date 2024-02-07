const mongoose = require('mongoose');

const calendariSchema = new mongoose.Schema({
  id: Number,
  data_ini: String,
  data_fi: String,
  motiu: String,
  num_dies: Number,
  user: String
});
const Calendari = mongoose.model('Calendari', calendariSchema);

module.exports = { Calendari };