const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.//console(),
        new winston.transports.File({ filename: 'app.log' })
    ]
});

// src/middleware/errorHandler.js
function errorHandler(err, req, res, next) {
    //console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
}

module.exports = errorHandler;