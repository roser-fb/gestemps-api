connection.connect();

router.get("/:id", (req, res) => {
  let userId = req.params.id;
  connection.query(
    "SELECT p.id+p.data_ini AS id, m.motiu_desc as title, p.data_ini as start,DATE_ADD(p.data_fi, INTERVAL 1 DAY) as end, 0 as fix FROM periodes p inner join motius m on p.motiu=m.id where p.user = ? UNION " +
      "SELECT f.id+f.data_ini AS id, m.motiu_desc as title, f.data_ini as start, DATE_ADD(f.data_ini, INTERVAL 1 DAY) as end, f.fix FROM festius f inner join motius m on f.motiu=m.id UNION " +
      "SELECT g.id+g.data AS id, m.motiu_desc as title, g.data as start, DATE_ADD(g.data, INTERVAL 1 DAY) as end, 0 as fix FROM guardies g inner join motius m on g.motiu=m.id where g.user = ?",
    [userId, userId],
    (error, results) => {
      if (error) {
        res.status(500).json({ status: "error" });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

module.exports = router;
