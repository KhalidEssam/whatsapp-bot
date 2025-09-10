const User = require('../models/User');
const Session = require('../models/Session');
const questionnaire = require('../data/prototype-questionnaire');

class ConversationService {
    async processMessage(phoneNumber, message) {
        try {
            // Get or create user
            let user = await User.findOne({ phoneNumber });
            if (!user) {
                user = await User.create({
                    phoneNumber,
                    preferredLanguage: this.detectLanguage(message)
                });
            }

            // Get or create active session
            let session = await Session.findOne({
                userId: user._id,
                status: 'active'
            });

            if (!session) {
                session = await Session.create({
                    userId: user._id,
                    questionnaireId: 'business_assessment',
                    language: user.preferredLanguage,
                    currentStep: 'welcome',
                    responses: new Map(),
                    availableServices: [],
                    status: 'active'   // <-- FIX
                });
            }


            // Process current step
            return await this.processStep(session, message);
        } catch (error) {
            //console.error('Conversation processing error:', error);
            return 'Sorry, something went wrong. Please try again.';
        }
    }

    async processStep(session, userMessage) {
        const currentQuestion = questionnaire.questions[session.currentStep];

        if (!currentQuestion) {
            return this.getLocalizedMessage('error', session.language);
        }

        // Handle different question types
        switch (currentQuestion.type) {
            case 'info':
                return await this.handleInfoStep(session, currentQuestion);
            case 'choice':
                return await this.handleChoiceStep(session, currentQuestion, userMessage);
            case 'completion':
                return await this.handleCompletion(session);
            default:
                return this.getLocalizedMessage('error', session.language);
        }
    }

    async handleInfoStep(session, question) {
        // Move to next step and return welcome message
        await this.updateSessionStep(session, question.nextStep);
        const nextQuestion = questionnaire.questions[question.nextStep];
        return question.message[session.language] + '\n\n' + nextQuestion.question[session.language];
    }

    async handleChoiceStep(session, question, userMessage) {
        const choice = userMessage.trim();
        const selectedOption = question.options[choice];

        if (!selectedOption) {
            return this.getLocalizedMessage('invalid_choice', session.language) + '\n\n' + question.question[session.language];
        }

        // Store response and update available services
        session.responses.set(question.id, {
            value: selectedOption.value,
            selectedServices: selectedOption.services,
            timestamp: new Date()
        });

        session.availableServices = selectedOption.services;
        await this.updateSessionStep(session, selectedOption.nextStep);

        // Get next question or complete
        const nextQuestion = questionnaire.questions[selectedOption.nextStep];
        if (nextQuestion.type === 'completion') {
            return await this.handleCompletion(session);
        }

        return nextQuestion.question[session.language];
    }

    async handleCompletion(session) {
        session.status = 'completed';
        session.completedAt = new Date();
        await session.save();

        const services = session.availableServices.join(', ');
        const completionMsg = questionnaire.questions.completion.message[session.language];

        return `${completionMsg}\n\n${this.getServicesList(session.availableServices, session.language)}`;
    }

    async updateSessionStep(session, nextStep) {
        session.currentStep = nextStep;
        session.lastActivity = new Date();
        await session.save();
    }

    detectLanguage(text) {
        // Simple Arabic detection (contains Arabic characters)
        const arabicRegex = /[\u0600-\u06FF]/;
        return arabicRegex.test(text) ? 'ar' : 'en';
    }

    getLocalizedMessage(key, language) {
        const messages = {
            error: {
                en: 'Sorry, I didn\'t understand that.',
                ar: 'عذراً، لم أفهم ذلك.'
            },
            invalid_choice: {
                en: 'Please select a valid option:',
                ar: 'يرجى اختيار خيار صحيح:'
            }
        };
        return messages[key][language] || messages[key]['en'];
    }

    getServicesList(services, language) {
        const serviceNames = {
            inventory_management: { en: 'Inventory Management', ar: 'إدارة المخزون' },
            pos_system: { en: 'POS System', ar: 'نظام نقاط البيع' },
            customer_analytics: { en: 'Customer Analytics', ar: 'تحليلات العملاء' },
            order_management: { en: 'Order Management', ar: 'إدارة الطلبات' },
            kitchen_display: { en: 'Kitchen Display', ar: 'شاشة المطبخ' },
            delivery_tracking: { en: 'Delivery Tracking', ar: 'تتبع التوصيل' },
            appointment_booking: { en: 'Appointment Booking', ar: 'حجز المواعيد' },
            client_management: { en: 'Client Management', ar: 'إدارة العملاء' },
            billing_system: { en: 'Billing System', ar: 'نظام الفوترة' }
        };

        const serviceList = services.map(service =>
            `• ${serviceNames[service]?.[language] || service}`
        ).join('\n');

        return language === 'ar' ? `الخدمات المتاحة:\n${serviceList}` : `Available Services:\n${serviceList}`;
    }
}

module.exports = new ConversationService();