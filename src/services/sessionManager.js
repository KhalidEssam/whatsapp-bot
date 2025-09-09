let userSessions = {};

function resetSession(userId) {
    userSessions[userId] = {
        currentStep: "welcomeMenu",
        answers: [],
        active: true,
        delayed: false,
        mode: null, // "survey" or "contact"
        hasSeenMenu: false,
        multiQueue: [], // 👈 for storing pending multiple sub-services
        multiCurrent: null // 👈 currently active sub-service
    };
}


function getSession(userId) {
    if (!userSessions[userId]) resetSession(userId);
    return userSessions[userId];
}

function updateSession(userId, updates) {
    userSessions[userId] = { ...getSession(userId), ...updates };
}

export default { resetSession, getSession, updateSession };
