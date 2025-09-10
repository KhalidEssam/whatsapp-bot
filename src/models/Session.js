import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: { type: String, required: true },  // <-- also string
    questionnaireId: String,
    status: { type: String, enum: ["active", "completed", "abandoned"], default: "active" },
    language: { type: String, enum: ["en", "ar"], default: "en" },
    currentStep: { type: String, default: "welcomeMenu" },

    // Store answers in array (to match in-memory structure)
    answers: [
        {
            step: String,
            value: mongoose.Schema.Types.Mixed,
            service: String,
            type: String,
        },
    ],

    // Queue-related fields
    multiQueue: [String],
    multiCurrent: String,

    // Session control
    active: { type: Boolean, default: true },
    delayed: { type: Boolean, default: false },
    mode: { type: String, enum: ["survey", "contact", null], default: null },
    hasSeenMenu: { type: Boolean, default: false },

    // Metadata
    availableServices: [String],
    startedAt: { type: Date, default: Date.now },
    completedAt: Date,
    lastActivity: { type: Date, default: Date.now },
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;