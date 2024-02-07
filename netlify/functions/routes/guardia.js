const express = require('express');
const moment = require('moment');
const router = express.Router();
const connection = require('../../../src/db')
const { Guardia } = require('../models/guardia-model');
connection.connect();
router.get('/', async (req, res) => {
  try {
    const results = await Guardia.find().sort({ data: 1 });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

router.get('/:year', async (req, res) => {
  try {
    const year = req.params.year;
    const results = await Guardia.find({ data: { $gte: new Date(year, 0, 1) } }).sort({ data: 1 });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const guardia = new Guardia(req.body);
    await guardia.save();
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const guardiaId = req.params.id;
    await Guardia.findByIdAndDelete(guardiaId);
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

module.exports = router;