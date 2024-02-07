const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../../../src/db')
const { User } = require('../models/user-model');
connection.connect();
router.post("/login", async (req, res) => {
  const { user, pwd } = req.body;
  try {
    const user = await User.findOne({ user });
    if (!user) {
      return res.status(400).json({ msg: "Invalid user or pwd" });
    }
    const pwdMatch = await bcrypt.compare(pwd, user.pwd);
    if (!pwdMatch) {
      return res.status(400).json({ msg: "Invalid user or pwd" });
    }
    const token = jwt.sign({ user: user.user }, user.pwd);
    return res.json({
      msg: "Successfully logged in",
      user: user.id,
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error' });
  }
});

router.post("/register", async (req, res) => {
  const { user, pwd } = req.body;
  try {
    const existingUser = await User.findOne({ user });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists, please login." });
    }
    const hashedPassword = await bcrypt.hash(pwd, 10); // 10 salt rounds
    const newUser = new User({ user, pwd: hashedPassword });
    await newUser.save();
    return res.json({ msg: "Successfully created user, please login" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error' });
  }
});

module.exports = router;