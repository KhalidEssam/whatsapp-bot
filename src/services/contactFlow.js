function handleContactFlow(session, message) {
    if (session.currentStep === "contact_name") {
        session.answers.push({ step: "contact_name", value: message, service: "contact" });
        session.currentStep = "contact_phone";
        return { reply: "📱 Please provide your phone number:", step: "contact_phone", type: "text" };
    }
    if (session.currentStep === "contact_phone") {
        session.answers.push({ step: "contact_phone", value: message, service: "contact" });
        session.currentStep = "contact_email";
        return { reply: "📧 Please provide your email address:", step: "contact_email", type: "text" };
    }
    if (session.currentStep === "contact_email") {
        session.answers.push({ step: "contact_email", value: message, service: "contact" });
        session.currentStep = "contact_done";
        return {
            reply: "✅ Thank you for providing your contact details! We will be in touch soon.",
            answers: session.answers,
            done: true,
        };
    }
    return null;
}

export default { handleContactFlow };
