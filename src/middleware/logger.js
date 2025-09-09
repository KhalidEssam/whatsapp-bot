// src/middleware/logger.js
import morgan from "morgan";

// Logs requests like: GET /chatbot 200 12ms
const requestLogger = morgan("dev");

export default requestLogger;
