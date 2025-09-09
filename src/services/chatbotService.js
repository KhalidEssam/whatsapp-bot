import sessionManager from "./sessionManager.js";
import contactFlow from "./contactFlow.js";
import surveyFlow from "./surveyFlow.js";
import questionnaireHelper from "./questionnaireHelper.js";
import reportGenerator from "./reportGenerator.js";

function detectLanguage(message) {
    const normalized = message?.toLowerCase().trim();
    if (/اهلا|مرحبا|السلام/.test(normalized)) return "ar"; // Arabic triggers
    if (/hi|hello|hey/.test(normalized)) return "en";       // English triggers
    return "en"; // fallback
}

// function generateReport(session, lang) {
//     const answers = session.answers || {};
//     if (Object.keys(answers).length === 0) {
//         return lang === "ar"
//             ? "📋 لا توجد إجابات حتى الآن."
//             : "📋 No answers recorded yet.";
//     }

//     let reportLines = [];
//     for (const [step, answer] of Object.entries(answers)) {
//         const q = questionnaireHelper.getQuestion(step);
//         const questionText = q?.question?.[lang] || step;
//         let answerText;

//         if (Array.isArray(answer)) {
//             answerText = answer.join(", ");
//         } else if (typeof answer === "object") {
//             answerText = JSON.stringify(answer);
//         } else {
//             answerText = String(answer);
//         }

//         reportLines.push(`❓ ${questionText}\n➡️ ${answerText}`);
//     }

//     return (lang === "ar" ? "📑 تقرير الإجابات:\n\n" : "📑 Report of answers:\n\n") + reportLines.join("\n\n");
// }

function processMessage(userId, message) {
    const session = sessionManager.getSession(userId);
    const normalized = message?.toLowerCase().trim();

    // 🟢 Restart handling
    if (normalized === "restart") {
        sessionManager.resetSession(userId);
        const newSession = sessionManager.getSession(userId);
        newSession.hasSeenMenu = false;
        newSession.lang = null;
        return {
            reply: "🔄 Session restarted! Please say Hi / أهلا وسهلا to set your language.",
            step: "lang_detect",
            type: "text"
        };
    }

    // 🟢 Detect language
    if (!session.lang) {
        session.lang = detectLanguage(message);
    }
    const lang = session.lang;

    // 🟢 Report command (doesn't reset session)
    if (normalized === "report") {
        console.log("🔍 Generating report...");
        const report = reportGenerator.generateReport(session, session.lang);
        console.log("🔍 Report generated:", report);

        return {
            reply: `📑 Report of answers:\n${report}`,
            answers: session.answers,
            step: questionnaireHelper.getQuestion(session.currentStep)?.id,
            type: "review"
        };
    }
    // 🟢 Finish command (early end + submit placeholder)
    if (normalized === "finish") {
        session.active = false; // mark session ended
        console.log("📝 Finish command triggered. Generating early report...");

        const report = reportGenerator.generateReport(session, session.lang);

        return {
            reply:
                lang === "ar"
                    ? `✅ تم إنهاء الجلسة مبكرًا.\n📑 تقرير الإجابات:\n${report}\n\n⚠️ (ملاحظة: سلوك حفظ البيانات لم يُفعل بعد)`
                    : `✅ Session finished early.\n📑 Report of answers:\n${report}\n\n⚠️ (Note: Submission behavior not yet implemented)`,
            answers: session.answers,
            step: "finished",
            type: "review"
        };
    }


    // Stop / Delay / Resume
    if (normalized === "stop") {
        session.active = false;
        return { reply: lang === "ar" ? "🛑 تم إيقاف الجلسة." : "🛑 Session stopped." };
    }
    if (normalized === "delay") {
        session.delayed = true;
        return { reply: lang === "ar" ? "⏸️ الجلسة مؤجلة. اكتب 'resume' لاحقاً." : "⏸️ Delayed. Type 'resume' later." };
    }
    if (normalized === "resume") {
        session.delayed = false;
        return {
            reply: lang === "ar" ? "▶️ استئناف..." : "▶️ Resuming...",
            step: session.currentStep,
            type: questionnaireHelper.getQuestion(session.currentStep)?.type
        };
    }

    if (!session.active) {
        return { reply: lang === "ar" ? "❌ تم إيقاف الجلسة. اكتب 'restart' للبدء من جديد." : "❌ Session stopped. Type 'restart' to start again." };
    }
    if (session.delayed) {
        return { reply: lang === "ar" ? "⏸️ الجلسة مؤجلة. اكتب 'resume' للمتابعة." : "⏸️ Session is delayed. Type 'resume' to continue." };
    }

    // 🟢 First-time menu
    if (!session.hasSeenMenu) {
        session.hasSeenMenu = true;

        const commandsInfo = lang === "ar"
            ? "\n\n⚙️ الأوامر المتاحة:\n- restart: إعادة تشغيل الجلسة\n- report: عرض تقرير الإجابات\n- stop: إيقاف الجلسة\n- delay: تأجيل الجلسة\n- resume: استئناف الجلسة\n- finish: إنهاء الجلسة مبكرًا"
            : "\n\n⚙️ Available commands:\n- restart: Restart the session\n- report: Show report of answers\n- stop: Stop the session\n- delay: Delay the session\n- resume: Resume the session\n- finish: Finish session early";

        return {
            reply: lang === "ar"
                ? "👋 أهلاً وسهلاً! اختر:\n1️⃣ طلب خدمة\n2️⃣ جمع بيانات التواصل" + commandsInfo
                : "👋 Welcome! Please choose:\n1️⃣ Service Request Survey\n2️⃣ Contact Info Gathering" + commandsInfo,
            step: "welcomeMenu",
            type: "choice"
        };
    }


    // 🟢 Menu choice
    if (session.currentStep === "welcomeMenu") {
        if (normalized === "1") {
            session.mode = "survey";
            session.currentStep = "main_service_type";
            const q = questionnaireHelper.getQuestion(session.currentStep);
            return {
                reply: q?.question?.[lang] || q?.message?.[lang],
                step: q?.id,
                type: q?.type
            };
        }
        if (normalized === "2") {
            session.mode = "contact";
            session.currentStep = "contact_name";
            return {
                reply: lang === "ar" ? "📛 من فضلك أدخل اسمك الكامل:" : "📛 Please provide your full name:",
                step: "contact_name",
                type: "text"
            };
        }
        return {
            reply: lang === "ar" ? "❌ خيار غير صالح. اختر 1 أو 2." : "❌ Invalid option. Please reply with 1 or 2.",
            step: "welcomeMenu",
            type: "choice"
        };
    }

    // 🟢 Delegate
    if (session.mode === "contact") return contactFlow.handleContactFlow(session, message, lang);
    if (session.mode === "survey") return surveyFlow.handleSurveyFlow(session, message, lang);

    return { reply: lang === "ar" ? "⚠️ حدث خطأ. اكتب 'restart'." : "⚠️ Something went wrong. Please type 'restart'." };
}

export default { processMessage };
