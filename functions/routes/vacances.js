const express = require('express');
const moment = require('moment');
const router = express.Router();
const connect = require('../../../src/db')
const { Periode } = require('../models/periode-model');

router.get('/', async (req, res) => {
  try {
    const results = await Periode.find().sort({ data_ini: 1 });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});
router.get('/:year', async (req, res) => {
  try {
    const year = req.params.year;
    const results = await Periode.find({ data_ini: { $gte: new Date(year, 0, 1) } }).sort({ data_ini: 1 });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});
router.post('/', async (req, res) => {
  try {
    const periode = new Periode(req.body);
    await periode.save();
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

// Manejador de la ruta para eliminar un período por su ID
router.delete('/:id', async (req, res) => {
  try {
    const periodeId = req.params.id;
    await Periode.findByIdAndDelete(periodeId);
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

module.exports = router;
