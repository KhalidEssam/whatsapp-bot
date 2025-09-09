const prototypeQuestionnaire = {
    id: 'business_assessment',
    name: {
        en: 'Business Assessment',
        ar: 'تقييم الأعمال'
    },
    questions: {
        welcome: {
            id: 'welcome',
            type: 'info',
            message: {
                en: 'Welcome! I\'ll help you find the right services for your business. Let\'s start!',
                ar: 'مرحباً! سأساعدك في العثور على الخدمات المناسبة لعملك. لنبدأ!'
            },
            nextStep: 'business_type'
        },
        business_type: {
            id: 'business_type',
            type: 'choice',
            question: {
                en: 'What type of business do you operate?\n1. Retail Store\n2. Restaurant\n3. Professional Services',
                ar: 'ما نوع العمل الذي تديره؟\n١. متجر بيع بالتجزئة\n٢. مطعم\n٣. خدمات مهنية'
            },
            options: {
                '1': {
                    value: 'retail',
                    services: ['inventory_management', 'pos_system', 'customer_analytics'],
                    nextStep: 'store_size'
                },
                '2': {
                    value: 'restaurant',
                    services: ['order_management', 'kitchen_display', 'delivery_tracking'],
                    nextStep: 'seating_capacity'
                },
                '3': {
                    value: 'professional',
                    services: ['appointment_booking', 'client_management', 'billing_system'],
                    nextStep: 'team_size'
                }
            }
        },
        store_size: {
            id: 'store_size',
            type: 'choice',
            question: {
                en: 'What\'s your store size?\n1. Small (1-2 employees)\n2. Medium (3-10 employees)\n3. Large (10+ employees)',
                ar: 'ما حجم متجرك؟\n١. صغير (١-٢ موظف)\n٢. متوسط (٣-١٠ موظفين)\n٣. كبير (أكثر من ١٠ موظفين)'
            },
            nextStep: 'completion'
        },
        completion: {
            id: 'completion',
            type: 'completion',
            message: {
                en: 'Thank you! Based on your answers, here are your recommended services:',
                ar: 'شكراً لك! بناءً على إجاباتك، إليك الخدمات الموصى بها:'
            }
        }
    }
};

module.exports = prototypeQuestionnaire;