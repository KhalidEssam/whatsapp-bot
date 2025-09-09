// src/controllers/chatbotController.js
import chatbotService from "../services/chatbotService.js";

export const handleChatMessage = (req, res) => {
    try {
        const { userId, message, lang } = req.body;
        const response = chatbotService.processMessage(userId, message, lang);
        res.json(response);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export default { handleChatMessage };