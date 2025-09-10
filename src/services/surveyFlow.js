// src/services/handleSurveyFlow.js
import questionnaireHelper from "./questionnaireHelper.js";
import reportGenerator from "./reportGenerator.js";

// 🔹 Main survey flow handler
function handleSurveyFlow(session, message, lang = "en") {

    // 🔹 Handle system-triggered next step or check_next_service
    if (!message) {
        // If multiQueue has items, process the next one
        if (session.multiQueue && session.multiQueue.length > 0) {
            console.log("🔍 System-triggered next step or check_next_service No of remaining services. ", session.multiQueue.length);

            session.currentStep = session.multiQueue.shift();
            const nextQuestion = questionnaireHelper.getQuestion(session.currentStep);

            if (nextQuestion) {
                return {
                    reply: nextQuestion.question?.[lang] || nextQuestion.message?.[lang],
                    step: nextQuestion.id,
                    type: nextQuestion.type
                };
            }
        }

        console.log("🔍 Queue empty → moving to completion steps");

        // Queue empty → go to completion_name FIRST
        session.currentStep = "completion_name";
        const completionStart = questionnaireHelper.getQuestion(session.currentStep);

        return {
            reply: completionStart.question?.[lang] || completionStart.message?.[lang],
            step: completionStart.id,
            type: completionStart.type
        };
    }


    // 🔹 CRITICAL: Check for multi-input FIRST
    if (session.awaitingMultiInput) {
        return handleMultiChoiceInput(session, message, lang);
    }

    // 🔹 Normal question handling
    let currentQuestion = questionnaireHelper.getQuestion(session.currentStep);
    //console.log("🔍 Current question:", currentQuestion);


    if (!currentQuestion) {
        return { reply: "⚠️ No further questions available. Please type 'restart' to begin again.", done: true };
    }

    // 🔹 Special handler for system step: check_next_service
    if (session.currentStep === "check_next_service") {
        console.log("🟢 System reached check_next_service");

        if (session.multiQueue && session.multiQueue.length > 0) {
            const nextStep = session.multiQueue.shift();
            console.log("➡️ Moving to next step from queue:", nextStep);

            session.currentStep = nextStep;
            const nextQuestion = questionnaireHelper.getQuestion(nextStep);

            if (nextQuestion) {
                return {
                    reply: nextQuestion.question?.[lang] || nextQuestion.message?.[lang],
                    step: nextQuestion.id,
                    type: nextQuestion.type
                };
            }
        }

        // ✅ If no more steps → jump to confirmation
        console.log("🟢 Queue empty → jumping to confirmation");
        session.currentStep = "confirmation_review";
        const confirmQuestion = questionnaireHelper.getQuestion("confirmation_review");
        const report = reportGenerator.generateReport(session);
        console.log("🟢 Report before replace:", report);
        console.log("🟢 Confirm Question Text:", confirmQuestion.message[lang]);

        return {
            reply: confirmQuestion.message[lang].replace("{{report}}", report),
            answers: session.answers,
            step: confirmQuestion.id,
            type: "review"
        };
    }



    // 🔹 Handle confirmation review
    if (session.currentStep === "confirmation_review") {
        if (message.toLowerCase() === "confirm") {
            return { reply: "✅ Thank you! Your responses have been submitted.", answers: session.answers, done: true };
        } else if (message.toLowerCase() === "restart") {
            session.answers = [];
            session.currentStep = "serviceA";
            const restartQuestion = questionnaireHelper.getQuestion(session.currentStep);
            return { reply: restartQuestion.question[lang], step: session.currentStep };
        } else {
            return { reply: "❌ Please reply with 'confirm' or 'restart'.", step: "confirmation_review", type: "review" };
        }
    }

    // 🔹 Handle normal questions
    if (currentQuestion.type === "choice") {
        return handleChoiceWithMultiple(session, currentQuestion, message, lang);
    }

    if (currentQuestion.type === "text" && message) {
        session.answers.push({
            step: currentQuestion.id,
            value: message,
            service: currentQuestion.service || session.mode
        });

        session.currentStep = currentQuestion.nextStep;

        // 🟢 FIX: If next step is check_next_service, trigger system handler immediately
        if (session.currentStep === "check_next_service") {
            console.log("🟢 Directly triggering check_next_service after last question");
            return handleSurveyFlow(session, null, lang);
        }

        const nextQuestion = questionnaireHelper.getQuestion(session.currentStep);
        return {
            reply: nextQuestion.question?.[lang] || nextQuestion.message?.[lang],
            step: nextQuestion.id,
            type: nextQuestion.type
        };
    }



    if (currentQuestion && currentQuestion.type === "completion") {
        return { reply: currentQuestion.message[lang], answers: session.answers, done: true };
    }
    //console.log("🔍 Current question:", currentQuestion);

    if (!currentQuestion) {
        // Check if we have remaining items in multiQueue
        if (session.multiQueue && session.multiQueue.length > 0) {
            session.currentStep = session.multiQueue.shift();
            const nextQuestion = questionnaireHelper.getQuestion(session.currentStep);
            if (nextQuestion) {
                return {
                    reply: nextQuestion.question?.[lang] || nextQuestion.message?.[lang],
                    step: nextQuestion.id,
                    type: nextQuestion.type
                };
            }
        }

        // If no more items, go to confirmation
        session.currentStep = "confirmation_review";
        const confirmQuestion = questionnaireHelper.getQuestion(session.currentStep);
        const report = reportGenerator.generateReport(session);
        return {
            reply: confirmQuestion.message[lang].replace("{{report}}", report),
            answers: session.answers,
            step: confirmQuestion.id,
            type: "review"
        };
    }
    else {
        return {
            reply: "✅ Thank you! All questions are done. Please provide your contact info.",
            step: "confirmation",
            type: "confirmation",
            answers: session.answers
        };
    }
}

// 🔹 Helper for handling choice with multiple sub-services
function handleChoiceWithMultiple(session, currentQuestion, message, lang) {
    console.log("🔍 handleChoiceWithMultiple called, message:", message);
    if (!message) {
        return {
            reply: currentQuestion.question?.[lang] || currentQuestion.message?.[lang],
            step: currentQuestion.id,
            type: currentQuestion.type
        };
    }

    const option = currentQuestion.options[message];
    if (!option) {
        return {
            reply: "❌ Invalid option. Please reply with a valid number.",
            question: currentQuestion.question?.[lang]
        };
    }

    if (option.value === "multiple") {
        // FIXED: Use option.nextStep instead of currentQuestion.nextStep
        session.awaitingMultiInput = option.nextStep;
        return {
            reply:
                (currentQuestion.question?.[session.lang] || "Please select all relevant options separated by commas (e.g., 1,3,4):")
                    .split("\n")
                    .slice(0, -1) // remove last line
                    .join("\n"),
            step: currentQuestion.id,
            type: "multi_choice_input"
        };

    }

    session.answers.push({
        step: currentQuestion.id,
        value: option.value,
        service: currentQuestion.service
    });
    session.currentStep = option.nextStep || currentQuestion.nextStep;

    // 🟢 FIX: If next step is check_next_service, trigger system handler immediately
    if (session.currentStep === "check_next_service") {
        console.log("🟢 Directly triggering check_next_service after last choice");
        return handleSurveyFlow(session, null, lang);
    }

    const nextQuestion = questionnaireHelper.getQuestion(session.currentStep);
    return {
        reply: nextQuestion?.question?.[lang] || nextQuestion?.message?.[lang],
        step: nextQuestion?.id,
        type: nextQuestion?.type
    };

}

// 🔹 Helper for handling user input of multi-choice numbers - COMPLETELY REWRITTEN

// 🔹 Helper for handling user input of multi-choice numbers - CORRECTED FOR NEW STRUCTURE
function handleMultiChoiceInput(session, message, lang) {
    console.log('🔍 handleMultiChoiceInput:', session.awaitingMultiInput, message);


    if (!session.awaitingMultiInput || !message) {
        return { reply: "⚠️ Please provide your selections.", step: session.currentStep };
    }

    const multiStepId = session.awaitingMultiInput;
    const multiQuestion = questionnaireHelper.getQuestion(multiStepId);

    console.log('🔍 Multi question:', multiQuestion?.id, multiQuestion?.options);

    if (!multiQuestion || !multiQuestion.options) {
        return { reply: "⚠️ No options available.", step: multiStepId };
    }

    const selections = message.split(",").map(s => s.trim());
    const validOptions = Object.keys(multiQuestion.options);

    //console.log('🔍 Selections:', selections, 'Valid options:', validOptions);

    // Validate all selections
    const invalidSelections = selections.filter(num => !validOptions.includes(num));
    if (invalidSelections.length > 0) {
        return {
            reply: `❌ Invalid selection(s): ${invalidSelections.join(', ')}. Please enter valid numbers separated by commas (${validOptions.join(', ')}).`,
            step: session.currentStep,
            type: "multi_choice_input"
        };
    }

    // Get the selected options
    const selectedOptions = selections.map(num => multiQuestion.options[num]).filter(Boolean);

    // Extract values and next steps
    const chosenValues = selectedOptions.map(opt => opt.value).flat(); // flat() because values are arrays
    const nextSteps = selectedOptions.map(opt => opt.nextStep);

    if (!chosenValues.length) {
        return {
            reply: "❌ No valid selections found. Please enter valid numbers separated by commas.",
            step: session.currentStep,
            type: "multi_choice_input"
        };
    }

    // Save the multi-selection answer
    session.answers.push({
        step: multiStepId,
        value: chosenValues,
        service: multiQuestion.service || session.mode,
        type: 'multi_selection'
    });

    // Queue the next steps for processing
    session.multiQueue = [...nextSteps];
    session.multiCurrent = session.multiQueue.shift();
    session.currentStep = session.multiCurrent;
    session.awaitingMultiInput = null;

    const nextQuestion = questionnaireHelper.getQuestion(session.currentStep);

    if (!nextQuestion) {
        // If no next question found, move to check next service
        session.currentStep = "check_next_service";
        //console.log('🔍 No next question found, moving to check_next_service');
        return handleSurveyFlow(session, null, lang);
    }

    return {
        reply: nextQuestion?.question?.[lang] || nextQuestion?.message?.[lang],
        step: nextQuestion?.id,
        type: nextQuestion?.type
    };
}


export { handleChoiceWithMultiple, handleMultiChoiceInput };
export default { handleSurveyFlow };