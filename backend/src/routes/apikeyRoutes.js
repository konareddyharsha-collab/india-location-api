const express = require("express");

const crypto = require("crypto");

const ApiKey =
  require("../models/ApiKey");

const router = express.Router();

router.post("/generate", async (req, res) => {

  try {

    const apiKey =
      "ak_" +
      crypto.randomBytes(16).toString("hex");

    const apiSecret =
      "as_" +
      crypto.randomBytes(16).toString("hex");

    const newKey = new ApiKey({
      apiKey,
      apiSecret,
    });

    await newKey.save();

    res.json({
      success: true,
      apiKey,
      apiSecret,
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }

});

module.exports = router;