const twilio = require('twilio');

class TwilioService {
    constructor() {
        this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    async sendMessage(to, message) {
        try {
            const result = await this.client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER, // whatsapp:+14155238886 (sandbox)
                to: `whatsapp:${to}`
            });
            return result;
        } catch (error) {
            //console.error('Twilio send error:', error);
            throw error;
        }
    }

    validateSignature(signature, url, params) {
        return twilio.validateRequest(
            process.env.TWILIO_AUTH_TOKEN,
            signature,
            url,
            params
        );
    }
}

module.exports = new TwilioService();