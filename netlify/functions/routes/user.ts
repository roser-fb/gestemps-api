const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = {};

const rondesDeSalt = 10;
router.post("/login", (req, res) => {
  const user = req.body;
  connection.query(
    "SELECT * FROM users WHERE user= ?",
    [user.username],
    (error, result) => {
      if (error) {
        return error;
      } else {
        if (!result) {
          return res.status(400).json({ msg: "Invalid username or password" });
        } else {
          bcrypt.compare(user.password, result[0].pwd, (err, coinciden) => {
            if (err) {
              return res
                .status(400)
                .json({ msg: "Invalid username or password" });
            } else {
              return res.json({
                msg: "Successfully logged in",
                user: result[0].id,
                token: jwt.sign({ user: user.username }, user.password),
              });
            }
          });
        }
      }
    }
  );
});

router.post("/register", (req, res) => {
  const user = req.body;
  connection.query(
    "SELECT * FROM users WHERE user= ?",
    [user.username],
    (error, result) => {
      if (error) {
        return error;
      } else {
        if (result.length == 0) {
          bcrypt.hash(user.password, rondesDeSalt, (err, pwdEncript) => {
            if (err) {
              res.status(500).json({ status: "error" });
            } else {
              connection.query(
                "INSERT INTO users (user, pwd) VALUES (?,?)",
                [user.username, pwdEncript],
                (error) => {
                  if (error) {
                    res.status(500).json({ status: "error" });
                  } else {
                    return res.json({
                      msg: "Successfully created user, please login",
                    });
                  }
                }
              );
            }
          });
        } else {
          return res
            .status(400)
            .json({ msg: "User already exists, please login." });
        }
      }
    }
  );
});

module.exports = router;
