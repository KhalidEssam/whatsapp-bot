function handleContactFlow(session, message , lang) {
    if (session.currentStep === "contact_name") {
        session.answers.push({ step: "contact_name", value: message, service: "contact" });
        session.currentStep = "contact_phone";
        return { reply: lang === "en" ? "📱 Please provide your phone number:" : " 📱 الرجاء تقديم رقم هاتفك:"
                        , step: "contact_phone", type: "text" };
    }
    if (session.currentStep === "contact_phone") {
        session.answers.push({ step: "contact_phone", value: message, service: "contact" });
        session.currentStep = "contact_email";
        return { reply: lang === "en" ?  "📧 Please provide your email address:" : " 📧 الرجاء تقديم عنوان بريدك الإلكتروني:"
                        , step: "contact_email", type: "text" };
    }
    if (session.currentStep === "contact_email") {
        session.answers.push({ step: "contact_email", value: message, service: "contact" });
        session.currentStep = "contact_done";
        return {
            reply: lang === "en" ?  "✅ Thank you for providing your contact details! We will be in touch soon." : "✅ شكراً على تقديم تفاصيل الاتصال! سنتواصل معك قريبا.",
            answers: session.answers,
            done: true,
        };
    }
    return null;
}

export default { handleContactFlow };
