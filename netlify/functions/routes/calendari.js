const express = require('express');
const moment = require('moment');
const router = express.Router();
const connection = require('../../../src/db')
const { Guardia } = require('../models/guardia-model');
const { Festiu } = require('../models/festiu-model');
const { Periode } = require('../models/periode-model');
connection.connect();
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const periodes = await Periode.aggregate([
      { $match: { user: userId } },
      {
        $lookup: {
          from: 'motius',
          localField: 'motiu',
          foreignField: '_id',
          as: 'motiu'
        }
      },
      {
        $project: {
          id: { $concat: [{ $toString: '$_id' }, '$data_ini'] },
          title: { $arrayElemAt: ['$motiu.motiu_desc', 0] },
          start: '$data_ini',
          end: { $add: ['$data_fi', 86400000] },
          fix: 0
        }
      }
    ]);

    const festius = await Festiu.aggregate([
      {
        $lookup: {
          from: 'motius',
          localField: 'motiu',
          foreignField: '_id',
          as: 'motiu'
        }
      },
      {
        $project: {
          id: { $concat: [{ $toString: '$_id' }, '$data_ini'] },
          title: { $arrayElemAt: ['$motiu.motiu_desc', 0] },
          start: '$data_ini',
          end: { $add: ['$data_ini', 86400000] },
          fix: 1
        }
      }
    ]);

    const guardies = await Guardia.aggregate([
      { $match: { user: userId } },
      {
        $lookup: {
          from: 'motius',
          localField: 'motiu',
          foreignField: '_id',
          as: 'motiu'
        }
      },
      {
        $project: {
          id: { $concat: [{ $toString: '$_id' }, '$data'] },
          title: { $arrayElemAt: ['$motiu.motiu_desc', 0] },
          start: '$data',
          end: { $add: ['$data', 86400000] },
          fix: 0
        }
      }
    ]);

    const events = [...periodes, ...festius, ...guardies];

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error' });
  }
});

module.exports = router;
