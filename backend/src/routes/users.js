const express = require("express");

const router = express.Router();

const User = require("../models/User");

router.get("/", async (req, res) => {

  try {

    const users = await User.find();

    res.json(users);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }

});
(() => {

  axios
    .get("http://localhost:5000/users")
    .then((res) => {

      setUsers(res.data);

    });

}, []);

module.exports = router;