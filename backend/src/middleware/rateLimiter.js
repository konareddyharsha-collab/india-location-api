const express = require('express');
const router = express.Router();

// Rate limiting tracker (simple in-memory store)
const requestCounts = {};
const RATE_LIMIT = 100; // requests per minute
const WINDOW_MS = 60 * 1000; // 1 minute

const rateLimiter = (req, res, next) => {
  const key = req.ip;
  const now = Date.now();

  if (!requestCounts[key]) {
    requestCounts[key] = [];
  }

  // Remove old requests outside the window
  requestCounts[key] = requestCounts[key].filter(time => now - time < WINDOW_MS);

  // Check limit
  if (requestCounts[key].length >= RATE_LIMIT) {
    return res.status(429).json({
      error: 'Too many requests, please try again later.',
      retryAfter: Math.ceil((WINDOW_MS - (now - requestCounts[key][0])) / 1000)
    });
  }

  requestCounts[key].push(now);
  next();
};

module.exports = rateLimiter;
