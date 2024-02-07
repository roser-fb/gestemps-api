const express = require('express');
const router = express.Router();
const serverless = require('serverless-http')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const connect = require('./src/db.js');
connect();

app.use(cors());
app.use(bodyParser.json());
app.get('/.netlify/functions/api', (_, res) => res.send('Hello World!'));

app.use('/user', require('./routes/user'));

app.use('/periodes', require('./routes/vacances'));
app.use('/festius', require('./routes/festius'));
app.use('/calendari', require('./routes/calendari'));
app.use('/guardia', require('./routes/guardia'));
app.use('/fitxar', require('./routes/fitxar'));

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app)