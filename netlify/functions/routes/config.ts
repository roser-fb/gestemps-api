const express = require("express");
const moments = require("moment");
const router = express.Router();
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "vacances-gestemps.a.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_64mq88Ba6s3OmUKfezW",
  database: "defaultdb",
});
