// server.js - FIXED VERSION
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import logger from "./src/middleware/logger.js";
import chatbotRoutes from "./src/routes/chatbot.js";

// Create express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global reference to WhatsApp socket
let whatsappClient = null;
let isInitializing = false;

async function initBaileys() {
    // Prevent multiple initialization attempts
    if (whatsappClient || isInitializing) {
        //console.log("⚡ Baileys already initialized or initializing, skipping...");
        return whatsappClient;
    }

    isInitializing = true;

    try {
        const { connectToWhatsApp } = await import("./whatsapp/index.js");
        whatsappClient = await connectToWhatsApp();

        if (whatsappClient) {
            console.log("🎉 WhatsApp client initialized successfully");
        }

        return whatsappClient;
    } catch (error) {
        //console.error("❌ Failed to initialize WhatsApp client:", error.message);
        whatsappClient = null;
        return null;
    } finally {
        isInitializing = false;
    }
}

// Function to get current WhatsApp client
export function getWhatsAppClient() {
    return whatsappClient;
}

// Function to reinitialize WhatsApp client (if needed)
export async function reinitializeWhatsApp() {
    whatsappClient = null;
    isInitializing = false;
    return await initBaileys();
}

// Initialize WhatsApp connection
initBaileys().catch(error => {
    console.error("❌ Critical error during WhatsApp initialization:", error);
});

// Middleware
app.use(logger);

// Database connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("📦 MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB error:", err));

        // Routes
        app.get("/", (req, res) => {
            res.json({
                status: "🚀 WhatsApp Bot Server is running",
                whatsapp_status: whatsappClient ? "connected" : "disconnected"
            });
        });

app.use("/chatbot", chatbotRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        server: "running",
        whatsapp: whatsappClient ? "connected" : "disconnected",
        database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
    });
});

// Error handler middleware (should be last)
app.use((error, req, res, next) => {
    console.error("❌ Unhandled error:", error);
    res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

export default app;