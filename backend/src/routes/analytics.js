const express = require("express");

const router = express.Router();

router.get("/stats", async (req, res) => {

  res.json({
    totalUsers: 120,
    totalRequests: 50000,
    responseTime: "45ms",
    revenue: 2500,
  });

});

module.exports = router;