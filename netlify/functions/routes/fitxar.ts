connection.connect();
//const path = "./vacances_roser.json";

//const periodes = JSON.parse(readFileSync(path));
router.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM fitxes order by data_ini desc",
    (error, results) => {
      if (error) {
        res.status(500).json({ status: "error" });
      } else {
        res.status(200).json(results);
      }
    }
  );
});
router.get("/:id", (req, res) => {
  let fitxaId = req.params.id + "%";
  connection.query(
    "SELECT * FROM fitxes where data_ini like ? order by data_ini desc",
    [fitxaId],
    (error, results) => {
      if (error) {
        res.status(500).json({ status: "error" });
      } else {
        res.status(200).json(results);
      }
    }
  );
});
router.post("/", (req, res) => {
  let fitxa = req.body;
  if (fitxa.id) {
    return res
      .status(400)
      .json({ msg: "Periode Id seems to already have an id assigned" });
  }
  connection.query(
    "INSERT INTO fitxes (data_ini, data_fi, temps,user) VALUES (?,?,?,?)",
    [
      fitxa.data_ini.toString(),
      fitxa.data_fi.toString(),
      fitxa.temps,
      fitxa.user,
    ],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
      } else {
        res.status(200).json({ status: "ok" });
      }
    }
  );
});
router.patch("/:id", (req, res) => {
  let fitxaId = req.params.id;
  let fitxa = req.body;
  connection.query(
    "UPDATE fitxes SET data_fi = ?, temps = ? WHERE user = ? AND id = ? ",
    [fitxa.data_fi.toString(), fitxa.temps, fitxa.user, fitxaId],
    (error, results) => {
      if (error) {
        res.status(500).json({ status: "error" });
      } else {
        res.status(200).json(results);
      }
    }
  );
});
router.get("/delete/:id", (req, res) => {
  let periodeId = req.params.id;
  connection.query("DELETE FROM fitxes WHERE id = ?", [periodeId], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ status: "error" });
    } else {
      res.status(200).json({ status: "ok" });
    }
  });
});
module.exports = router;
