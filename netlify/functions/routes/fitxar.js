const express = require('express');

const router = express.Router();
const connect = require('../../../src/db')
const { Fitxa } = require('../models/fitxar-model.js');

router.get('/', async (req, res) => {
  try {
    const results = await Fitxa.find().sort({ data_ini: -1 });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const fitxaId = req.params.id + '%';
    const results = await Fitxa.find({ data_ini: { $regex: fitxaId, $options: 'i' } }).sort({ data_ini: -1 });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const fitxa = new Fitxa(req.body);
    await fitxa.save();
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const fitxaId = req.params.id;
    const fitxa = req.body;
    await Fitxa.updateOne({ _id: fitxaId, user: fitxa.user }, { $set: { data_fi: fitxa.data_fi.toString(), temps: fitxa.temps } });
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const fitxaId = req.params.id;
    await Fitxa.deleteOne({ _id: fitxaId });
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

module.exports = router;