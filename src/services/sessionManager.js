import Session from "../models/Session.js"; // mongoose model

let userSessions = {};

// Reset (create new session both in memory + db)
async function resetSession(userId) {
    const baseSession = {
        currentStep: "welcomeMenu",
        answers: [],
        active: true,
        delayed: false,
        mode: null,
        hasSeenMenu: false,
        multiQueue: [],
        multiCurrent: null,
    };

    userSessions[userId] = baseSession;

    // Also save to MongoDB
    await Session.findOneAndUpdate(
        { userId },
        { ...baseSession, lastActivity: new Date(), status: "active" },
        { upsert: true, new: true }
    );

    return baseSession;
}

// Get session from memory, fallback to DB
async function getSession(userId) {
    if (userSessions[userId]) {
        if (userSessions[userId].status === "completed") {
            return await resetSession(userId); // auto fresh session
        }
        return userSessions[userId];
    }

    const dbSession = await Session.findOne({ userId });
    if (dbSession) {
        if (dbSession.status === "completed") {
            return await resetSession(userId);
        }
        userSessions[userId] = dbSession.toObject();
        return userSessions[userId];
    }

    return await resetSession(userId);
}


// Update session (memory + DB)
async function updateSession(userId, updates) {
    const current = await getSession(userId);
    const updated = { ...current, ...updates, lastActivity: new Date() };

    userSessions[userId] = updated;

    await Session.findOneAndUpdate({ userId }, updated, { new: true });
    return updated;
}

export default { resetSession, getSession, updateSession };
