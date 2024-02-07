connection.connect();
//const path = "./vacances_roser.json";

//const periodes = JSON.parse(readFileSync(path));
router.get("/", (req, res) => {
  connection.query("SELECT * FROM guardies order by data", (error, results) => {
    if (error) {
      res.status(500).json({ status: "error" });
    } else {
      res.status(200).json(results);
    }
  });
});
router.get("/:id", (req, res) => {
  let anyGuardia = req.params.id;
  connection.query(
    "SELECT * FROM guardies where YEAR(data)>= ? order by data",
    [anyGuardia],
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
  let guardia = req.body;
  if (guardia.id) {
    return res
      .status(400)
      .json({ msg: "Periode Id seems to already have an id assigned" });
  }
  connection.query(
    "INSERT INTO guardies (data, n_hores, festiu,motiu,user) VALUES (?,?,?,?,?)",
    [guardia.data.toString(), guardia.n_hores, guardia.festiu, 8, guardia.user],
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
router.get("/delete/:id", (req, res) => {
  let periodeId = req.params.id;
  connection.query(
    "DELETE FROM guardies WHERE id = ?",
    [periodeId],
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
/** 
router.get('/', (req, res) => {
  var query = (req.query['q'] || '').toLowerCase();
  if (query) {
    const foundPeriodes = periodes.filter(
      ({ name }) => name.toLowerCase().indexOf(query) !== -1
    );
    return res.status(200).json(foundPeriodes);
  }
  return res.status(200).json(periodes);
});

router.post('/', (req, res) => {
  let guardia=req.body;

  if (guardia.id) {
    return res
      .status(400)
      .json({ msg: 'Periode Id seems to already have an id assigned' });
  }
 
  guardia.id = periodes.length + 1;
  periodes.push(guardia);

  try {
    writeFileSync(path, JSON.stringify(periodes, null, 2), "utf8");
    console.log("Data successfully saved");
} catch (error) {
    console.log("An error has occurred ", error);
}
  return res.status(200).json(guardia);
});

router.patch('/:id', (req, res) => {
  const periodeId = req.params.id;
  const foundPeriode = periodes.find(({ id }) => id == periodeId);
  if (foundPeriode) {
    return res.status(200).json({ msg: 'Successfully updated cart' });
  }
  return res
    .status(400)
    .json({ msg: 'Periode with id ' + periodeId + ' not found.' });
});
function calculaDies(data_ini,data_fi){
  var from = moment(data_ini, 'DD/MM/YYY'),
  to = moment(data_fi, 'DD/MM/YYY'),
  dies = 0;
    
  while (!from.isAfter(to)) {
    // Si no es sabado ni domingo
    if (from.isoWeekday() !== 6 && from.isoWeekday() !== 7) {
      dies++;
    }
    from.add(1, 'dies');
  }
 
  return dies;
};
*/
module.exports = router;
