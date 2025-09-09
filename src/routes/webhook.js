const express = require('express');
const router = express.Router();
const twilioService = require('../services/twilioService');
const conversationService = require('../services/conversationService');

router.post('/whatsapp', async (req, res) => {
    try {
        const { From, Body, MessageSid } = req.body;

        // Extract phone number (remove whatsapp: prefix)
        const phoneNumber = From.replace('whatsapp:', '');

        //console.log(`Message from ${phoneNumber}: ${Body}`);

        // Process message through conversation engine
        const response = await conversationService.processMessage(phoneNumber, Body);

        // Send response back
        await twilioService.sendMessage(phoneNumber, response);

        res.status(200).send('OK');
    } catch (error) {
        //console.error('Webhook error:', error);
        res.status(500).send('Error');
    }
});

module.exports = router;