import serverless from "serverless-http";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = express();
const connection = mysql.createConnection({
  host: "vacances-gestemps.a.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_64mq88Ba6s3OmUKfezW",
  database: "defaultdb",
});
api.use(cors());
api.use(bodyParser.json());

api.use("/api/user", require("./user"));

api.use("/api/periodes", require("./routes/periodes"));
api.use("/api/festius", require("./routes/festius"));
api.use("/api/calendari", require("./routes/calendari"));
api.use("/api/guardia", require("./routes/guardia"));
api.use("/api/fitxar", require("./routes/fitxar"));

export const handler = serverless(api);
