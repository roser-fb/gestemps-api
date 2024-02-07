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
app.get('/api/', (_, res) => res.send('API Works!'));

app.use('/api/user', require('./routes/user'));

app.use('/api/periodes', require('./routes/vacances'));
app.use('/api/festius', require('./routes/festius'));
app.use('/api/calendari', require('./routes/calendari'));
app.use('/api/guardia', require('./routes/guardia'));
app.use('/api/fitxar', require('./routes/fitxar'));

app.use('/api', router);
app.listen(3000);
module.exports.handler = serverless(app)
