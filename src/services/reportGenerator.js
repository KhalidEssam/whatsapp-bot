import questionnaireHelper from "./questionnaireHelper.js";

function generateReport(session, lang = "ar") {
    if (!session.answers?.length) {
        return lang === "ar"
            ? "📋 لا توجد بيانات مكتملة حتى الآن."
            : "📋 No completed data yet.";
    }

    let report = [];

    session.answers.forEach((a, i) => {
        // Fetch question metadata dynamically
        const q = questionnaireHelper.getQuestion(a.step);
        const questionText = q?.question?.[lang] || `Q${i + 1}`;

        // Format answer
        let answerText;
        if (Array.isArray(a.value)) {
            answerText = a.value.join(", ");
        } else if (typeof a.value === "object") {
            answerText = JSON.stringify(a.value);
        } else {
            answerText = String(a.value);
        }

        report.push(`❓ ${questionText}\n➡️ ${answerText}`);
    });

    return (lang === "ar" ? "📑 تقرير الإجابات:\n\n" : "📑 Report of answers:\n\n") +
        report.join("\n\n");
}

export default { generateReport };
