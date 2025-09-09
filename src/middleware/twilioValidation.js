const twilio = require('twilio');

const validateTwilioSignature = (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        return next(); // Skip validation in development
    }

    const signature = req.headers['x-twilio-signature'];
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    const isValid = twilio.validateRequest(
        process.env.TWILIO_AUTH_TOKEN,
        signature,
        url,
        req.body
    );

    if (!isValid) {
        return res.status(403).send('Forbidden');
    }

    next();
};

module.exports = validateTwilioSignature;