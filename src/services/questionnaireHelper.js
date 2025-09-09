import { enhancedQuestionnaire as questionnaire } from "../../src/data/questionnaire.js";

function getQuestion(stepId) {
    // console.log('🔍 getQuestion called, stepId:', questionnaire.questions[stepId] || null);
    return questionnaire.questions[stepId] || null;
}
function getSubServicesArray(stepId) {
    const step = questionnaire.questions[stepId];
    if (!step || !step.options) return [];
    return Object.values(step.options); // returns ['social_media_management', 'visual_identity_design', ...]
}


function getNextService(session) {
    console.log('🔍 getNextService called, multiQueue:', session.multiQueue);

    // If there are still items in the multiQueue, return the next one
    if (session.multiQueue && session.multiQueue.length > 0) {
        const nextStep = session.multiQueue.shift();
        console.log('🔍 Next step from queue:', nextStep);
        return nextStep;
    }

    console.log('🔍 No more items in queue, going to confirmation');
    // If queue is empty, go to confirmation
    return "confirmation";
}


export default { getQuestion, getNextService, getSubServicesArray };
