// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Log response when it finishes
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    };
    console.log(JSON.stringify(log));
  });

  next();
};

module.exports = requestLogger;
