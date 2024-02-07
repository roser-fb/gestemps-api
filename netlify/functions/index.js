const express = require('express');
const serverless = require('serverless-http')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.get('/', (_, res) => res.send('Hello World!'));

app.use('/api/user', require('./routes/user'));

app.use('/api/periodes', require('./routes/vacances'));
app.use('/api/festius', require('./routes/festius'));
app.use('/api/calendari', require('./routes/calendari'));
app.use('/api/guardia', require('./routes/guardia'));
app.use('/api/fitxar', require('./routes/fitxar'));

module.exports.handler = serverless(app)