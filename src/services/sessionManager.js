import Session from "../models/Session.js";

let userSessions = {};

// Create a brand-new session in memory + DB
async function createNewSession(userId) {
    const baseSession = {
        userId,
        currentStep: "welcomeMenu",
        answers: [],
        active: true,
        delayed: false,
        mode: null,
        hasSeenMenu: false,
        multiQueue: [],
        multiCurrent: null,
        status: "active",
        createdAt: new Date(),
    };

    const newDbSession = await Session.create(baseSession);
    userSessions[userId] = newDbSession.toObject();

    return userSessions[userId];
}

// Get latest session for a user
async function getSession(userId) {
    // First check memory
    if (userSessions[userId]) return userSessions[userId];

    // Get the latest session from DB
    const dbSession = await Session.findOne({ userId }).sort({ createdAt: -1 });

    if (dbSession) {
        userSessions[userId] = dbSession.toObject();
        return userSessions[userId];
    }

    // No session found → create new one
    return await createNewSession(userId);
}

// Reset or start a new session if last one is completed
async function resetSession(userId) {
    // Check latest session
    const latestSession = await Session.findOne({ userId }).sort({ createdAt: -1 });

    if (latestSession && latestSession.status !== "completed") {
        // If not completed, just return the existing session
        userSessions[userId] = latestSession.toObject();
        return userSessions[userId];
    }

    // If completed or no session, create new
    return await createNewSession(userId);
}

// Update session both memory + DB
async function updateSession(userId, updates) {
    const current = await getSession(userId);
    const updated = { ...current, ...updates, lastActivity: new Date() };

    userSessions[userId] = updated;

    await Session.findByIdAndUpdate(current._id, updated, { new: true });
    return updated;
}

const SESSION_TTL = 1000 * 60 * 30; // 30 mins

function cleanupSessions() {
    const now = Date.now();
    for (const [userId, session] of Object.entries(userSessions)) {
        if (now - new Date(session.lastActivity || session.createdAt).getTime() > SESSION_TTL) {
            delete userSessions[userId];
        }
    }
}

// Run cleanup every 10 mins
setInterval(cleanupSessions, 1000 * 60 * 10);


export default { createNewSession, getSession, resetSession, updateSession };