const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questionnaireId: String,
    status: { type: String, enum: ['active', 'completed', 'abandoned'], default: 'active' },
    language: { type: String, enum: ['en', 'ar'], default: 'en' },
    currentStep: { type: String, default: 'welcome' },
    responses: { type: Map, of: mongoose.Schema.Types.Mixed },
    availableServices: [String],
    startedAt: { type: Date, default: Date.now },
    completedAt: Date,
    lastActivity: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);