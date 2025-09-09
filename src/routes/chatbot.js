// src/routes/chatbot.js (ESM)

import { Router } from "express";
import * as chatbotController from "../controllers/chatbotController.js";

const chatbotRoutes = Router();

// POST /chatbot
chatbotRoutes.post("/", chatbotController.handleChatMessage);

export default chatbotRoutes;
