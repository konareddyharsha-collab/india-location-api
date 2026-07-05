const express = require("express");

const router = express.Router();

router.get("/stats", (req, res) => {

  res.json({
    users: 1250,
    requests: 250000,
    revenue: 4500,
    responseTime: "120ms",
  });

});

module.exports = router;