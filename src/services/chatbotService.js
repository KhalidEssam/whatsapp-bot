import sessionManager from "./sessionManager.js";
import contactFlow from "./contactFlow.js";
import surveyFlow from "./surveyFlow.js";
import questionnaireHelper from "./questionnaireHelper.js";
import reportGenerator from "./reportGenerator.js";
import User from "../models/User.js";
import Report from "../models/Report.js"; // add at top

function detectLanguage(message) {
    const normalized = message?.toLowerCase().trim();
    if (/اهلا|مرحبا|السلام/.test(normalized)) return "ar"; // Arabic triggers
    if (/hi|hello|hey/.test(normalized)) return "en";       // English triggers
    return "en"; // fallback
}


async function processMessage(userId, message) {
    const session = await sessionManager.getSession(userId);
    const normalized = message?.toLowerCase().trim();

    // 🟢 Restart handling
    if (normalized === "restart") {
        sessionManager.resetSession(userId);
        const newSession = await sessionManager.getSession(userId);
        newSession.hasSeenMenu = false;
        newSession.lang = null;
        return {
            reply: "🔄 Session restarted! Please say Hi / أهلا وسهلا to set your language.",
            step: "lang_detect",
            type: "text"
        };
    }

    // 🟢 Load user's preferred language if session has none
    if (!session.lang) {
        let user = await User.findOne({ phoneNumber: userId }); // <-- FIXED

        if (user?.preferredLanguage) {
            session.lang = user.preferredLanguage;
        } else {
            session.lang = detectLanguage(message); // fallback detection

            if (user) {
                // update existing user
                await User.findOneAndUpdate(
                    { phoneNumber: userId },
                    { preferredLanguage: session.lang }
                );
            } else {
                // create new user if not found
                user = await User.create({
                    phoneNumber: userId,
                    preferredLanguage: session.lang
                });
            }
        }
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


    // 🟢 Finish command
    if (normalized === "finish") {
        session.active = false;
        session.status = "completed";   // NEW
        session.completedAt = new Date();

        const reportText = reportGenerator.generateReport(session, session.lang);

        try {
            await Report.create({
                userId,
                answers: session.answers,
                reportText,
                language: session.lang,
            });

            // ✅ Update session in DB + memory
            await sessionManager.updateSession(userId, {
                active: false,
                status: "completed",
                completedAt: new Date(),
                lastReport: reportText, // optional
            });

            console.log("✅ Report + session update saved for:", userId);
        } catch (err) {
            console.error("❌ Failed to save report/session:", err);
        }

        return {
            reply:
                lang === "ar"
                    ? `✅ تم إنهاء الجلسة.\n📑 تقرير الإجابات:\n${reportText}\n\n💾 تم حفظ التقرير في قاعدة البيانات.`
                    : `✅ Session finished.\n📑 Report of answers:\n${reportText}\n\n💾 Report saved to database.`,
            answers: session.answers,
            step: "finished",
            type: "review",
        };
    }



    // Stop / Delay / Resume
    if (normalized === "stop") {
        await sessionManager.updateSession(userId, { active: false });
        return { reply: lang === "ar" ? "🛑 تم إيقاف الجلسة." : "🛑 Session stopped." };
    }
    if (normalized === "delay") {
        await sessionManager.updateSession(userId, { delayed: true });
        return { reply: lang === "ar" ? "⏸️ الجلسة مؤجلة. اكتب 'resume' لاحقاً." : "⏸️ Delayed. Type 'resume' later." };
    }
    if (normalized === "resume") {
        const updated = await sessionManager.updateSession(userId, { delayed: false });
        return {
            reply: lang === "ar" ? "▶️ استئناف..." : "▶️ Resuming...",
            step: updated.currentStep,
            type: questionnaireHelper.getQuestion(updated.currentStep)?.type
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
