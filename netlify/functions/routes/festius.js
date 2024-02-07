const express = require('express');
const moment = require('moment');
const router = express.Router();
const connect = require('../../../src/db')
const { Festiu } = require('../models/festiu-model');

router.get('/', async (req, res) => {
  try {
    const results = await Festiu.find().sort({ data_ini: 1 });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const periode = new Festiu(req.body);
    await periode.save();
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const periodeId = req.params.id;
    await Festiu.deleteOne({ _id: periodeId });
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

module.exports = router;
