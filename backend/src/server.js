require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');
const rateLimiter = require('./middleware/rateLimiter');
const analyticsRoutes = require("./routes/analytics");
const usersRoutes = require("./routes/users");
const apikeyRoutes =
  require("./routes/apikeyRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/admin", adminRoutes);

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(rateLimiter);
app.use('/api/analytics', analyticsRoutes);
app.use("/apikeys", apikeyRoutes);
app.use("/users", usersRoutes);
app.use("/admin", adminRoutes);

const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/locationsRoutes');

app.use('/auth', authRoutes);
app.use('/api/locations', locationRoutes);

app.get('/', (req, res) => {
    res.send('Village API is running');
});

// error handler (must be last)
app.use(errorHandler);

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/village-api-project';
mongoose.connect(mongoUri)
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});