const express = require('express');

// Centralized error handler
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors)
            .map(e => e.message)
            .join(', ');
        return res.status(400).json({ error: messages });
    }

    if (err.name === 'MongoServerError' && err.code === 11000) {
        return res.status(409).json({ error: 'Duplicate entry' });
    }

    res.status(err.statusCode || 500).json({
        error: err.message || 'Internal server error'
    });
};

module.exports = errorHandler;
