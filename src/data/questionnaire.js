

export const enhancedQuestionnaire =
{
    id: 'business_services_assessment',
    name: {
        en: 'Business Services Assessment'
    },
    questions: {

        main_service_type: {
            id: 'main_service_type',
            type: 'choice',
            question: {
                en: ' Welcome! I\'ll help you find the right services for your business. Select Main Service Type:\n1. Marketing & Creative Services\n2. Technical & Digital Transformation Services\n3. Financial & Administrative Services\n4. Corporate Management & Consulting Services',
                ar: ' مرحبا سوف اساعدك على اختيار الخدمة المناسبة لك. اختر احدي الخدمات الرئيسية. \n1. خدمات التسويق والابداع\n2. خدمات التحول الرقمي\n3. خدمات المالية والادارية\n4. خدمات الادارة والاستشارات'

            },
            options: {
                '1': {
                    value: 'marketing_creative',
                    nextStep: 'marketing_services'
                },
                '2': {
                    value: 'technical_digital',
                    nextStep: 'technical_services'
                },
                '3': {
                    value: 'financial_admin',
                    nextStep: 'financial_services'
                },
                '4': {
                    value: 'corporate_consulting',
                    nextStep: 'corporate_services'
                }
            }
        },

        // Marketing & Creative Services Branch
        marketing_services: {
            id: 'marketing_services',
            type: 'choice',
            question: {
                en: 'Marketing & Creative Services - Select services you need:\n1. Social Media Account Management\n2. Visual Identity Design\n3. Website Design\n4. Marketing Content Creation\n5. Advertising Campaign Management\n6. Presentation Design\n7. Multiple services (will ask about each)',
                ar: 'الخدمات التسويقية والإبداعية - اختر الخدمات التي تحتاجها:\n1. إدارة حسابات وسائل التواصل الاجتماعي\n2. تصميم الهوية البصرية\n3. تصميم المواقع الإلكترونية\n4. إنشاء المحتوى التسويقي\n5. إدارة الحملات الإعلانية\n6. تصميم العروض التقديمية\n7. خدمات متعددة (سيتم سؤالك عن كل خدمة)',
            },

            options: {
                '1': {
                    value: ['social_media_management'],
                    nextStep: 'social_media_questions'
                },
                '2': {
                    value: ['visual_identity_design'],
                    nextStep: 'visual_identity_questions'
                },
                '3': {
                    value: ['website_design'],
                    nextStep: 'website_questions'
                },
                '4': {
                    value: ['marketing_content'],
                    nextStep: 'content_questions'
                },
                '5': {
                    value: ['advertising_campaigns'],
                    nextStep: 'advertising_questions'
                },
                '6': {
                    value: ['presentation_design'],
                    nextStep: 'presentation_questions'
                },
                '7': {
                    value: 'multiple',
                    nextStep: 'marketing_multi_select'  // ← This is what we need
                }
            }
        },

        marketing_multi_select: {
            id: 'marketing_multi_select',
            type: 'multi_choice',
            question: {
                en: 'Select all Marketing & Creative Services you need (enter numbers separated by commas, e.g., 1,3,4):\n1. Social Media Account Management\n2. Visual Identity Design\n3. Website Design\n4. Marketing Content Creation\n5. Advertising Campaign Management\n6. Presentation Design',
                ar: 'اختر جميع خدمات التسويق والإبداع التي تحتاجها (اكتب الأرقام مفصولة بفواصل، مثل 1،3،4):\n1. إدارة حسابات التواصل الاجتماعي\n2. تصميم الهوية البصرية\n3. تصميم المواقع الإلكترونية\n4. إنشاء محتوى تسويقي\n5. إدارة الحملات الإعلانية\n6. تصميم العروض التقديمية'
            },
            options: {
                '1': {
                    value: ['social_media_management'],
                    nextStep: 'social_media_questions'
                },
                '2': {
                    value: ['visual_identity_design'],
                    nextStep: 'visual_identity_questions'
                },
                '3': {
                    value: ['website_design'],
                    nextStep: 'website_questions'
                },
                '4': {
                    value: ['marketing_content'],
                    nextStep: 'content_questions'
                },
                '5': {
                    value: ['advertising_campaigns'],
                    nextStep: 'advertising_questions'
                },
                '6': {
                    value: ['presentation_design'],
                    nextStep: 'presentation_questions'
                },
            },
            nextStep: 'social_media_questions',
            conditionalFlow: true
        },

        // Social Media Management Questions
        social_media_questions: {
            id: 'social_media_questions',
            type: 'choice',
            question: {
                en: 'Select all platforms you need (enter numbers separated by commas, e.g., 1,3,4):\n1. Instagram\n2. Twitter (X)\n3. TikTok\n4. LinkedIn\n5. Facebook',
                ar: 'ما المنصات التي تريد إدارتها؟ (أدخل الأرقام مفصولة بفواصل، مثل: 1,3,4):\n1. انستقرام (Instagram)\n2. منصة إكس (Twitter)\n3. تيك توك (TikTok)\n4. لينكد إن (LinkedIn)\n5. فيسبوك (Facebook)'
            },

            options: {
                '1': { value: ['Instagram'], nextStep: 'social_content_type' },
                '2': { value: ['Twitter'], nextStep: 'social_content_type' },
                '3': { value: ['TikTok'], nextStep: 'social_content_type' },
                '4': { value: ['LinkedIn'], nextStep: 'social_content_type' },
                '5': { value: ['Facebook'], nextStep: 'social_content_type' },
                '6': { value: 'multiple', nextStep: 'social_platforms_multi' }
            },
            conditional: {
                requiredValues: ['social_media_management'],
                requiredStep: 'marketing_services'
            }
        },

        social_platforms_multi: {
            id: 'social_platforms_multi',
            type: 'multi_choice',
            question: {
                en: 'Select all platforms you need (enter numbers separated by commas):\n1. Instagram\n2. Twitter\n3. TikTok\n4. LinkedIn\n5. Facebook',
                ar: 'اختر جميع المنصات التي تحتاجها (أدخل الأرقام مفصولة بفواصل):\n1. إنستجرام\n2. تويتر\n3. تيك توك\n4. لينكدإن\n5. فيسبوك'
            }
            ,
            options: {
                '1': 'Instagram',
                '2': 'Twitter',
                '3': 'TikTok',
                '4': 'LinkedIn',
                '5': 'Facebook'
            },
            nextStep: 'social_content_type'
        },

        social_content_type: {
            id: 'social_content_type',
            type: 'choice',
            question: {
                en: 'What type of content do you need?\n1. Static designs\n2. Short videos\n3. Interactive content\n4. Multiple types',
                ar: 'ما نوع المحتوى الذي تحتاجه؟\n1. تصاميم ثابتة\n2. مقاطع فيديو قصيرة\n3. محتوى تفاعلي\n4. أنواع متعددة'
            },

            options: {
                '1': { value: ['static_designs'], nextStep: 'visual_identity_check' },
                '2': { value: ['short_videos'], nextStep: 'visual_identity_check' },
                '3': { value: ['interactive_content'], nextStep: 'visual_identity_check' },
                '4': { value: ['static_designs', 'short_videos', 'interactive_content'], nextStep: 'visual_identity_check' }
            }
        },

        visual_identity_check: {
            id: 'visual_identity_check',
            type: 'choice',
            question: {
                en: 'Do you already have a visual identity?\n1. Yes\n2. No',
                ar: 'هل لديك هوية بصرية بالفعل؟\n1. نعم\n2. لا'
            }
            ,
            options: {
                '1': { value: 'yes', nextStep: 'upcoming_campaigns' },
                '2': { value: 'no', nextStep: 'upcoming_campaigns' }
            }
        },

        upcoming_campaigns: {
            id: 'upcoming_campaigns',
            type: 'text',
            question: {
                en: 'Any upcoming campaigns or events? (Please describe or type "none")',
                ar: 'هل لديك حملات أو فعاليات قادمة؟ (يرجى الوصف أو اكتب "لا يوجد")'
            },
            nextStep: 'management_goals'
        },

        management_goals: {
            id: 'management_goals',
            type: 'choice',
            question: {
                en: 'What are your goals for social media management?\n1. Increase followers\n2. Engagement\n3. Service inquiries\n4. All of the above',
                ar: 'ما هي أهدافك من إدارة حسابات التواصل الاجتماعي؟\n1. زيادة المتابعين\n2. زيادة التفاعل\n3. زيادة الاستفسارات عن الخدمات\n4. جميع ما سبق'
            },

            options: {
                '1': { value: ['increase_followers'], nextStep: 'monthly_reports' },
                '2': { value: ['engagement'], nextStep: 'monthly_reports' },
                '3': { value: ['service_inquiries'], nextStep: 'monthly_reports' },
                '4': { value: ['increase_followers', 'engagement', 'service_inquiries'], nextStep: 'monthly_reports' }
            }
        },

        monthly_reports: {
            id: 'monthly_reports',
            type: 'choice',
            question: {
                en: 'Do you want monthly performance reports?\n1. Yes\n2. No',
                ar: 'هل ترغب في تقارير أداء شهرية؟\n1. نعم\n2. لا'
            }
            ,
            options: {
                '1': { value: 'yes', nextStep: 'check_next_service' },
                '2': { value: 'no', nextStep: 'check_next_service' }
            }
        },

        // Website Design Questions
        website_questions: {
            id: 'website_questions',
            type: 'choice',
            question: {
                en: 'Do you have a registered domain name?\n1. Yes\n2. No',
                ar: 'هل لديك اسم دومين مسجل؟\n١. نعم\n٢. لا'
            },
            options: {
                '1': { value: 'yes', nextStep: 'hosting_setup' },
                '2': { value: 'no', nextStep: 'hosting_setup' }
            },
            conditional: {
                requiredValues: ['website_design'],
                requiredStep: 'marketing_services'
            }
        },

        hosting_setup: {
            id: 'hosting_setup',
            type: 'choice',
            question: {
                en: 'Do you have hosting set up?\n1. Yes\n2. No'
            },
            options: {
                '1': { value: 'yes', nextStep: 'website_pages' },
                '2': { value: 'no', nextStep: 'website_pages' }
            }
        },

        website_pages: {
            id: 'website_pages',
            type: 'text',
            question: {
                en: 'Approximate number of pages needed (e.g., Home, About Us, Services, Contact Us)?'
            },
            nextStep: 'website_language'
        },

        website_language: {
            id: 'website_language',
            type: 'choice',
            question: {
                en: 'Required website language:\n1. Arabic\n2. English\n3. Both',
                ar: 'اللغة المطلوبة للموقع:\n1. العربية\n2. الإنجليزية\n3. كلاهما'
            },
            options: {
                '1': { value: ['arabic'], nextStep: 'website_purpose' },
                '2': { value: ['english'], nextStep: 'website_purpose' },
                '3': { value: ['arabic', 'english'], nextStep: 'website_purpose' }
            }
        },

        // 🔹 Next question in the flow
        website_purpose: {
            id: 'website_purpose',
            type: 'choice',
            question: {
                en: 'What is the main purpose of the website?\n1. Company profile only\n2. Service showcase with booking\n3. E-commerce (sell products)',
                ar: 'هل الغرض من الموقع:\n1. تعريف بالشركة فقط (عرض)\n2. عرض خدمات مع إمكانية الحجز\n3. متجر إلكتروني (بيع منتجات)'
            },
            options: {
                '1': { value: 'company_profile', nextStep: 'website_integrations' },
                '2': { value: 'service_booking', nextStep: 'website_integrations' },
                '3': { value: 'ecommerce', nextStep: 'website_integrations' }
            }
        },

        // 🔹 External integrations
        website_integrations: {
            id: 'website_integrations',
            type: 'choice',
            question: {
                en: 'Do you need integration with external systems?\n1. Online payment gateway\n2. SMS system\n3. Appointment booking platform\n4. Other (please specify)',
                ar: 'هل تحتاج إلى ربط الموقع بجهات خارجية؟\n1. بوابة دفع إلكتروني\n2. نظام رسائل SMS\n3. منصة حجز مواعيد\n4. غير ذلك (يرجى التوضيح)'
            },
            options: {
                '1': { value: ['payment_gateway'], nextStep: 'website_design_reference' },
                '2': { value: ['sms_system'], nextStep: 'website_design_reference' },
                '3': { value: ['booking_platform'], nextStep: 'website_design_reference' },
                '4': { value: ['other_integration'], nextStep: 'website_design_reference' }
            }
        },

        // 🔹 Design reference
        website_design_reference: {
            id: 'website_design_reference',
            type: 'text',
            question: {
                en: 'Do you have a design or references of websites you like? (please provide links)',
                ar: 'هل لديك تصميم أو مرجع لمواقع تعجبك؟ (يرجى إدراج الرابط)'
            },
            nextStep: 'check_next_service'
        },

        // Marketing Content Creation Questions
        content_questions: {
            id: 'content_questions',
            type: 'choice',
            question: {
                en: 'What type of content do you need?\n1. Social posts\n2. Website copy\n3. Articles/blogs\n4. Ad copy\n5. Multiple types',
                ar: 'ما نوع المحتوى الذي تحتاجه؟\n1. منشورات لوسائل التواصل\n2. محتوى للموقع الإلكتروني\n3. مقالات / مدونات\n4. نصوص إعلانية\n5. أنواع متعددة'
            },
            options: {
                '1': { value: ['social_posts'], nextStep: 'content_goals' },
                '2': { value: ['website_copy'], nextStep: 'content_goals' },
                '3': { value: ['articles_blogs'], nextStep: 'content_goals' },
                '4': { value: ['ad_copy'], nextStep: 'content_goals' },
                '5': { value: ['social_posts', 'website_copy', 'articles_blogs', 'ad_copy'], nextStep: 'content_goals' }
            },
            conditional: {
                requiredValues: ['marketing_content'],
                requiredStep: 'marketing_services'
            }
        },

        content_goals: {
            id: 'content_goals',
            type: 'choice',
            question: {
                en: 'What is your content goal?\n1. Brand awareness\n2. Engagement\n3. Lead generation\n4. Product/service explanation\n5. Multiple goals',
                ar: 'ما هو هدفك من المحتوى؟\n1. رفع الوعي بالعلامة التجارية\n2. زيادة التفاعل\n3. توليد عملاء محتملين\n4. شرح المنتج / الخدمة\n5. أهداف متعددة'
            },
            options: {
                '1': { value: ['brand_awareness'], nextStep: 'content_language' },
                '2': { value: ['engagement'], nextStep: 'content_language' },
                '3': { value: ['lead_generation'], nextStep: 'content_language' },
                '4': { value: ['product_explanation'], nextStep: 'content_language' },
                '5': { value: ['brand_awareness', 'engagement', 'lead_generation', 'product_explanation'], nextStep: 'content_language' }
            }
        },

        content_language: {
            id: 'content_language',
            type: 'choice',
            question: {
                en: 'Required language for content:\n1. Arabic\n2. English\n3. Both',
                ar: 'ما اللغة المطلوبة للمحتوى؟\n1. العربية\n2. الإنجليزية\n3. كلاهما'
            },
            options: {
                '1': { value: ['arabic'], nextStep: 'content_references' },
                '2': { value: ['english'], nextStep: 'content_references' },
                '3': { value: ['arabic', 'english'], nextStep: 'content_references' }
            }
        },

        content_references: {
            id: 'content_references',
            type: 'text',
            question: {
                en: 'Do you have examples or references we should follow? (Please describe or type "none")',
                ar: 'هل لديك أمثلة أو مراجع نلتزم بها؟ (صفها أو اكتب "لا يوجد")'
            },
            nextStep: 'check_next_service'
        },

        // Presentation Design Questions
        presentation_questions: {
            id: 'presentation_questions',
            type: 'choice',
            question: {
                en: 'What type of presentation do you need?\n1. Company profile\n2. Business plan\n3. Marketing campaign\n4. Product/service pitch\n5. Other',
                ar: 'ما نوع العرض التقديمي الذي تحتاجه؟\n1. ملف تعريفي للشركة\n2. خطة عمل\n3. حملة تسويقية\n4. عرض منتج / خدمة\n5. أخرى'
            },
            options: {
                '1': { value: 'company_profile', nextStep: 'presentation_slides' },
                '2': { value: 'business_plan', nextStep: 'presentation_slides' },
                '3': { value: 'marketing_campaign', nextStep: 'presentation_slides' },
                '4': { value: 'product_pitch', nextStep: 'presentation_slides' },
                '5': { value: 'other', nextStep: 'presentation_slides' }
            },
            conditional: {
                requiredValues: ['presentation_design'],
                requiredStep: 'marketing_services'
            }
        },

        presentation_slides: {
            id: 'presentation_slides',
            type: 'choice',
            question: {
                en: 'Approximate number of slides:\n1. Less than 10\n2. 10-20\n3. More than 20',
                ar: 'عدد الشرائح التقريبي:\n1. أقل من 10\n2. من 10 إلى 20\n3. أكثر من 20'
            },
            options: {
                '1': { value: 'less_than_10', nextStep: 'presentation_content' },
                '2': { value: '10_to_20', nextStep: 'presentation_content' },
                '3': { value: 'more_than_20', nextStep: 'presentation_content' }
            }
        },

        presentation_content: {
            id: 'presentation_content',
            type: 'choice',
            question: {
                en: 'Is content written and ready?\n1. Yes\n2. No, need help',
                ar: 'هل المحتوى مكتوب وجاهز؟\n1. نعم\n2. لا، أحتاج المساعدة'
            },
            options: {
                '1': { value: 'yes', nextStep: 'presentation_language' },
                '2': { value: 'no_need_help', nextStep: 'presentation_language' }
            }
        },

        presentation_language: {
            id: 'presentation_language',
            type: 'choice',
            question: {
                en: 'Required language for presentation:\n1. Arabic\n2. English\n3. Both',
                ar: 'ما اللغة المطلوبة للعرض التقديمي؟\n1. العربية\n2. الإنجليزية\n3. كلاهما'
            },
            options: {
                '1': { value: ['arabic'], nextStep: 'check_next_service' },
                '2': { value: ['english'], nextStep: 'check_next_service' },
                '3': { value: ['arabic', 'english'], nextStep: 'check_next_service' }
            }
        },

        // Visual Identity Questions
        visual_identity_questions: {
            id: 'visual_identity_questions',
            type: 'text',
            question: {
                ar: 'يرجى اضافة وصف تفصيلي عن الشركة و رؤية التصميم المطلوب لها:',
                en: 'Please describe your business and the style you envision for your visual identity:'
            },
            nextStep: 'visual_identity_brand_name',
            // nextStep: 'check_next_service',
            conditional: {
                requiredValues: ['visual_identity_design'],
                requiredStep: 'marketing_services'
            }
        },

        visual_identity_brand_name: {
            id: 'visual_identity_brand_name',
            type: 'text',
            question: {
                en: 'What is the brand name for the identity design?',
                ar: 'ما هو اسم البراند المراد تصميم الهوية له؟'
            },
            nextStep: 'visual_identity_logo_type'
        },

        visual_identity_logo_type: {
            id: 'visual_identity_logo_type',
            type: 'choice',
            question: {
                en: 'What type of logo do you prefer?',
                ar: 'ما نوع الشعار الذي تفضله؟'
            },
            options: {
                '1': { value: 'symbolic_icon', nextStep: 'visual_identity_logo_samples' }, // شعار أيقوني/رمزي
                '2': { value: 'text', nextStep: 'visual_identity_logo_samples' },          // شعار نصي
                '3': { value: 'mixed_text_icon', nextStep: 'visual_identity_logo_samples' } // شعار نصي + أيقونة
            }
        },

        visual_identity_logo_samples: {
            id: 'visual_identity_logo_samples',
            type: 'choice',
            question: {
                en: 'Do you have logo samples you like?',
                ar: 'هل لديك نماذج شعارات تعجبك؟'
            },
            options: {
                '1': { value: 'upload_files', nextStep: 'visual_identity_colors' }, // رفع ملفات
                '2': { value: 'provide_links', nextStep: 'visual_identity_colors' } // تزويد روابط
            }
        },

        visual_identity_colors: {
            id: 'visual_identity_colors',
            type: 'text',
            question: {
                en: 'What colors do you prefer? Any colors to avoid?',
                ar: 'ما الألوان التي تفضلها؟ وهل هناك ألوان ترغب في تجنبها؟'
            },
            nextStep: 'visual_identity_business_activity'
        },

        visual_identity_business_activity: {
            id: 'visual_identity_business_activity',
            type: 'text',
            question: {
                en: 'What type of business activity does your company engage in?',
                ar: 'ما نوع النشاط التجاري الذي تمارسه شركتك؟'
            },
            nextStep: 'visual_identity_guidelines'
        },

        visual_identity_guidelines: {
            id: 'visual_identity_guidelines',
            type: 'choice',
            question: {
                en: 'Do you need a brand guidelines booklet?',
                ar: 'هل تحتاج إلى كتيّب إرشادات الهوية البصرية؟'
            },
            options: {
                '1': { value: 'yes', nextStep: 'visual_identity_existing_logo' }, // نعم
                '2': { value: 'no', nextStep: 'visual_identity_existing_logo' }   // لا
            }
        },

        visual_identity_existing_logo: {
            id: 'visual_identity_existing_logo',
            type: 'choice',
            question: {
                en: 'Do you already have a logo you’d like to redesign?',
                ar: 'هل لديك شعار بالفعل وترغب في إعادة تصميمه؟'
            },
            options: {
                '1': { value: 'yes', nextStep: 'check_next_service' }, // نعم
                '2': { value: 'no', nextStep: 'check_next_service' }   // لا
            }
        },



        ///////////////////////////////////////////////////

        // Technical & Digital Services Branch
        technical_services: {
            id: 'technical_services',
            type: 'choice',
            question: {
                en: 'Technical & Digital Transformation Services - Select what you need:\n1. Custom Management Systems (CRM/ERP)\n2. Process Automation\n3. Application Development\n4. Ongoing Technical Support\n5. Multiple services'
            },
            options: {
                '1': { value: ['custom_systems'], nextStep: 'custom_system_questions' },
                '2': { value: ['process_automation'], nextStep: 'automation_questions' },
                '3': { value: ['app_development'], nextStep: 'app_questions' },
                '4': { value: ['technical_support'], nextStep: 'support_questions' },
                '5': { value: 'multiple', nextStep: 'technical_multi_select' }
            }
        },

        technical_multi_select: {
            id: 'technical_multi_select',
            type: 'multi_choice',
            question: {
                en: 'Select all Technical services you need (enter numbers separated by commas):\n1. Custom Management Systems (CRM/ERP)\n2. Process Automation\n3. Application Development\n4. Ongoing Technical Support'
            },
            options: {
                '1': { value: ['custom_systems'], nextStep: 'custom_system_questions' },
                '2': { value: ['process_automation'], nextStep: 'automation_questions' },
                '3': { value: ['app_development'], nextStep: 'app_questions' },
                '4': { value: ['technical_support'], nextStep: 'support_questions' },
            },
            nextStep: 'custom_system_questions',
            conditionalFlow: true
        },
        // 🟢 Advertising Campaigns Flow
        advertising_questions: {
            id: "advertising_questions",
            type: "choice",
            question: {
                en: "Advertising Campaigns - Select what you need:\n1. Google Ads\n2. Instagram / Facebook\n3. LinkedIn\n4. TikTok",
                ar: "ما المنصة التي ترغب بإطلاق الحملة عليها؟ *\n1. Google Ads\n2. Instagram / Facebook\n3. LinkedIn\n4. TikTok"
            },
            options: {
                '1': { value: "Google Ads", nextStep: "ad_campaign_goal" },
                '2': { value: "Instagram / Facebook", nextStep: "ad_campaign_goal" },
                '3': { value: "LinkedIn", nextStep: "ad_campaign_goal" },
                '4': { value: "TikTok", nextStep: "ad_campaign_goal" }
            },
            service: "advertising_campaigns"
        },

        ad_campaign_goal: {
            id: "ad_campaign_goal",
            type: "choice",
            question: {
                en: "What is the primary goal of the campaign?\n1. Increase website traffic\n2. Generate leads (Leads)\n3. Increase sales\n4. Raise brand awareness",
                ar: "ما الهدف الأساسي من الحملة؟ *\n1. زيادة الزيارات للموقع\n2. توليد عملاء محتملين (Leads)\n3. زيادة المبيعات\n4. رفع الوعي بالعلامة التجارية"
            },
            options: {
                '1': { value: "زيادة الزيارات", nextStep: "ad_campaign_previous" },
                '2': { value: "توليد عملاء", nextStep: "ad_campaign_previous" },
                '3': { value: "زيادة المبيعات", nextStep: "ad_campaign_previous" },
                '4': { value: "رفع الوعي", nextStep: "ad_campaign_previous" }
            },
            service: "advertising_campaigns"
        },

        ad_campaign_previous: {
            id: "ad_campaign_previous",
            type: "choice",
            question: {
                en: "Have you previously launched advertising campaigns?\n1. Yes\n2. No",
                ar: "هل سبق وأن قمت بحملات إعلانية من قبل؟ *\n1. نعم\n2. لا"
            },
            options: {
                '1': { value: "نعم", nextStep: "ad_campaign_budget" },
                '2': { value: "لا", nextStep: "ad_campaign_budget" }
            },
            service: "advertising_campaigns"
        },

        ad_campaign_budget: {
            id: "ad_campaign_budget",
            type: "text",
            question: {
                ar: "ما الميزانية المخصصة للحملة؟ (يمكن تحديد تقديري) *",
                en: "What is the budget for the campaign? (can be estimated)"
            },
            options: {
                '1': { value: "نعم", nextStep: "ad_campaign_duration" },
                '2': { value: "لا", nextStep: "ad_campaign_duration" }
            },
            nextStep: "ad_campaign_duration",
            service: "advertising_campaigns"
        },

        ad_campaign_duration: {
            id: "ad_campaign_duration",
            type: "choice",
            question: {
                ar: "كم مدة الحملة الإعلانية المطلوبة؟ *\n1. أسبوع\n2. أسبوعان\n3. شهر\n4. تحتاج خطة كاملة",
                en: "How long is the advertising campaign needed? *\n1. Week\n2. Weeks\n3. Month\n4. Need a full plan"
            },
            options: {
                '1': { value: "أسبوع", nextStep: "ad_campaign_content" },
                '2': { value: "أسبوعان", nextStep: "ad_campaign_content" },
                '3': { value: "شهر", nextStep: "ad_campaign_content" },
                '4': { value: "خطة كاملة", nextStep: "ad_campaign_content" }
            },
            service: "advertising_campaigns"
        },

        ad_campaign_content: {
            id: "ad_campaign_content",
            type: "choice",
            question: {
                ar: "هل لديك محتوى أو تصميمات جاهزة للإعلان؟ *\n1. نعم\n2. لا، نحتاج مساعدتكم",
                en: "Do you have content or designs ready for advertising? *\n1. Yes\n2. No, I need help"
            },
            options: {
                '1': { value: "جاهز", nextStep: "check_next_service" },
                '2': { value: "نحتاج مساعدة", nextStep: "check_next_service" }
            },
            service: "advertising_campaigns"
        },

        // 🟢 Presentation Design Flow
        presentation_questions: {
            id: "presentation_questions",
            type: "choice",
            question: {
                en: "What type of presentation do you need?\n1. Company Presentation\n2. Business Plan\n3. Marketing Presentation\n4. Product/Service Presentation\n5. Other",
                ar: "ما نوع العرض التقديمي الذي تحتاجه؟ *\n1. عرض تعريفي للشركة\n2. عرض لخطة عمل\n3. عرض تسويقي لحملة\n4. عرض تقديم منتج أو خدمة\n5. غير ذلك"
            },
            options: {
                '1': { value: "عرض تعريفي", nextStep: "presentation_slides" },
                '2': { value: "خطة عمل", nextStep: "presentation_slides" },
                '3': { value: "عرض تسويقي", nextStep: "presentation_slides" },
                '4': { value: "عرض منتج/خدمة", nextStep: "presentation_slides" },
                '5': { value: "غير ذلك", nextStep: "presentation_slides" }
            },
            service: "presentation_design"
        },

        presentation_slides: {
            id: "presentation_slides",
            type: "choice",
            question: {
                en: "How many slides are expected? *\n1. Less than 10\n2. Between 10 and 20\n3. More than 20",
                ar: "كم عدد الشرائح المتوقع تقريبًا؟ *\n1. أقل من 10\n2. من 10 إلى 20\n3. أكثر من 20"
            },
            options: {
                '1': { value: "أقل من 10", nextStep: "presentation_content_ready" },
                '2': { value: "10-20", nextStep: "presentation_content_ready" },
                '3': { value: "أكثر من 20", nextStep: "presentation_content_ready" }
            },
            service: "presentation_design"
        },

        presentation_content_ready: {
            id: "presentation_content_ready",
            type: "choice",
            question: {
                en: "Is the content written and ready? *\n1. Yes\n2. No",
                ar: "هل المحتوى مكتوب وجاهز؟ *\n1. نعم\n2. لا"
            },
            options: {
                '1': { value: "محتوى جاهز", nextStep: "presentation_reference" },
                '2': { value: "غير جاهز", nextStep: "presentation_reference" }
            },
            service: "presentation_design"
        },

        presentation_reference: {
            id: "presentation_reference",
            type: "text",
            question: { ar: "هل لديك مرجع لتصميم معين ترغب بمحاكاته؟ (ضع رابط العرض أو قم بارفاقه) *" ,
                en: "Do you have a specific design reference you want to try out? (Paste a link to the presentation or attach it)"
             },
            nextStep: "presentation_language",
            service: "presentation_design"
        },

        presentation_language: {
            id: "presentation_language",
            type: "choice",
            question: {
                en: "What language is required for the presentation? *\n1. Arabic\n2. English\n3. Both",
                ar: "ما اللغة المطلوبة في العرض؟ *\n1. عربي\n2. إنجليزي\n3. كلاهما"
            },
            options: {
                '1': { value: "عربي", nextStep: "check_next_service" },
                '2': { value: "إنجليزي", nextStep: "check_next_service" },
                '3': { value: "كلاهما", nextStep: "check_next_service" }
            },
            service: "presentation_design"
        },


        // Custom Systems Questions
        custom_system_questions: {
            id: 'custom_system_questions',
            type: 'choice',
            question: {
                ar: 'ما نوع النظام المطلوب؟\n1. ادارة علاقات العملاء (CRM)\n2. نظام متكامل لادارة الاعمال (ERP)\n3. كلاهما',
                en: 'What type of system do you need?\n1. Customer Relationship Management (CRM)\n2. Enterprise Resource Planning (ERP)\n3. Both'
            },
            options: {
                '1': { value: ['crm'], nextStep: 'system_departments' },
                '2': { value: ['erp'], nextStep: 'system_departments' },
                '3': { value: ['crm', 'erp'], nextStep: 'system_departments' }
            },
            conditional: {
                requiredValues: ['custom_systems'],
                requiredStep: 'technical_services'
            }
        },

        system_departments: {
            id: 'system_departments',
            type: 'choice',
            question: {
                ar: 'ما الاقسام التي تحتاج ادارةها في النظام؟\n1. مبيعات\n2. توريد\n3. ادارة الموارد\n4. مالية\n5. المخزون\n6. اكثر من قسم',
                en: 'Which departments need to be managed in the system?\n1. Sales\n2. Procurement\n3. Human Resources\n4. Finance\n5. Inventory\n6. Multiple departments'
            },
            options: {
                '1': { value: ['sales'], nextStep: 'current_system' },
                '2': { value: ['procurement'], nextStep: 'current_system' },
                '3': { value: ['hr'], nextStep: 'current_system' },
                '4': { value: ['finance'], nextStep: 'current_system' },
                '5': { value: ['inventory'], nextStep: 'current_system' },
                '6': { value: ['sales', 'procurement', 'hr', 'finance', 'inventory'], nextStep: 'current_system' }
            }
        },

        current_system: {
            id: 'current_system',
            type: 'choice',
            question: {
                ar: 'هل تستخدم نظام اخر في الوقت الحالي؟\n1. نعم\n2. لا',
                en: 'Are you currently using another system?\n1. Yes\n2. No'
            },
            options: {
                '1': { value: 'yes', nextStep: 'current_system_name' },
                '2': { value: 'no', nextStep: 'system_type' }
            }
        },

        current_system_name: {
            id: 'current_system_name',
            type: 'text',
            question: {
                en: 'What is the name of your current system?',
                ar: 'ما هو اسم نظامك الحالي؟'
            },
            nextStep: 'system_type'
        },

        system_type: {
            id: 'system_type',
            type: 'choice',
            question: {
                ar: 'ما نوع نظامك؟\n1. موقع ويب (Online)\n2. داخلي (Internal Application)\n3. كلاهما',
                en: 'Do you need the system to be:\n1. Web-based (Online)\n2. On-Premise (Internal Application)\n3. Both options work'
            },
            options: {
                '1': { value: 'web_based', nextStep: 'system_integration' },
                '2': { value: 'on_premise', nextStep: 'system_integration' },
                '3': { value: 'either', nextStep: 'system_integration' }
            }
        },

        system_integration: {
            id: 'system_integration',
            type: 'text',
            question: {
                ar: 'هل تحتاج تكامل النظام مع انتظمة اخرى؟\n1. نعم\n2. لا',
                en: 'Do you need the system to integrate with external platforms (accounting, POS, payment gateways, etc.)? Please specify or type "none".'
            },
            nextStep: 'system_users'
        },

        system_users: {
            id: 'system_users',
            type: 'text',
            question: {
                en: 'Expected number of users for the system?',
                ar: 'ما عدد المستخدمين المتوقعين للنظام؟'
            },
            nextStep: 'system_training'
        },

        system_training: {
            id: 'system_training',
            type: 'choice',
            question: {
                en: 'Do you need training for your team on how to use the system?\n1. Yes\n2. No',
                ar: 'هل تحتاج تدريب لفريقك على كيفية استخدام النظام؟\n1. نعم\n2. لا'

            },
            options: {
                '1': { value: 'yes', nextStep: 'check_next_tech_service' },
                '2': { value: 'no', nextStep: 'check_next_tech_service' }
            }
        },

        // Process Automation Questions
        automation_questions: {
            id: 'automation_questions',
            type: 'text',
            question: {
                en: 'What kind of processes would you like to automate? (e.g., leave requests, approvals, daily tasks)',
                ar: 'ما هي العمليات التي ترغب بتحليلها؟ (مثل طلبات الإجازة، الموافقات، المهام اليومية)'
            },
            nextStep: 'automation_tools',
            conditional: {
                requiredValues: ['process_automation'],
                requiredStep: 'technical_services'
            }
        },

        automation_tools: {
            id: 'automation_tools',
            type: 'text',
            question: {
                en: 'Are you currently using management tools (such as Trello, Notion, Monday, Zoho)? Please specify or type "none".'
            },
            nextStep: 'automation_approach'
        },

        automation_approach: {
            id: 'automation_approach',
            type: 'text',
            question: {
                en: 'Would you prefer to build the system from scratch or use customized off-the-shelf solutions?'
            },
            nextStep: 'automation_goals'
        },

        automation_goals: {
            id: 'automation_goals',
            type: 'choice',
            question: {
                en: 'What are your goals for automation?\n1. Reduce manual effort\n2. Improve efficiency\n3. Minimize errors\n4. Improve employee experience\n5. All of the above'
            },
            options: {
                '1': { value: ['reduce_manual'], nextStep: 'check_next_tech_service' },
                '2': { value: ['improve_efficiency'], nextStep: 'check_next_tech_service' },
                '3': { value: ['minimize_errors'], nextStep: 'check_next_tech_service' },
                '4': { value: ['improve_experience'], nextStep: 'check_next_tech_service' },
                '5': { value: ['reduce_manual', 'improve_efficiency', 'minimize_errors', 'improve_experience'], nextStep: 'check_next_tech_service' }
            }
        },

        // Application Development Questions
        app_questions: {
            id: 'app_questions',
            type: 'choice',
            question: {
                en: 'What kind of application would you like to develop?\n1. Mobile app (iOS/Android)\n2. Web App\n3. Both'
            },
            options: {
                '1': { value: ['mobile_app'], nextStep: 'app_purpose' },
                '2': { value: ['web_app'], nextStep: 'app_purpose' },
                '3': { value: ['mobile_app', 'web_app'], nextStep: 'app_purpose' }
            },
            conditional: {
                requiredValues: ['app_development'],
                requiredStep: 'technical_services'
            }
        },

        app_purpose: {
            id: 'app_purpose',
            type: 'choice',
            question: {
                en: 'What is the purpose of the application?\n1. Commercial (sales, reservations, customer follow-up)\n2. Internal service\n3. Educational or informative\n4. Other'
            },
            options: {
                '1': { value: 'commercial', nextStep: 'app_idea' },
                '2': { value: 'internal_service', nextStep: 'app_idea' },
                '3': { value: 'educational', nextStep: 'app_idea' },
                '4': { value: 'other', nextStep: 'app_idea' }
            }
        },

        app_idea: {
            id: 'app_idea',
            type: 'text',
            question: {
                en: 'Do you have a complete idea, or shall we start from scratch? Please describe your concept.'
            },
            nextStep: 'app_similar'
        },

        app_similar: {
            id: 'app_similar',
            type: 'text',
            question: {
                en: 'Are there any similar applications on the market? Please mention them if available or type "none".'
            },
            nextStep: 'app_language'
        },

        app_language: {
            id: 'app_language',
            type: 'text',
            question: {
                en: 'Do you prefer a specific language for the interface? (e.g., Arabic, English, both)'
            },
            nextStep: 'app_login'
        },

        app_login: {
            id: 'app_login',
            type: 'choice',
            question: {
                en: 'Does the application require user login?\n1. Yes\n2. No'
            },
            options: {
                '1': { value: 'yes', nextStep: 'app_integrations' },
                '2': { value: 'no', nextStep: 'app_integrations' }
            }
        },

        app_integrations: {
            id: 'app_integrations',
            type: 'text',
            question: {
                en: 'Does the app need to connect with payment gateways, messaging services, or external websites? Please specify or type "none".'
            },
            nextStep: 'check_next_tech_service'
        },

        // Technical Support Questions
        support_questions: {
            id: 'support_questions',
            type: 'choice',
            question: {
                en: 'What kind of technical support do you need?\n1. Website monitoring and maintenance\n2. Support for existing system/application\n3. Emergency response\n4. All of the above'
            },
            options: {
                '1': { value: ['website_maintenance'], nextStep: 'support_hours' },
                '2': { value: ['system_support'], nextStep: 'support_hours' },
                '3': { value: ['emergency_response'], nextStep: 'support_hours' },
                '4': { value: ['website_maintenance', 'system_support', 'emergency_response'], nextStep: 'support_hours' }
            },
            conditional: {
                requiredValues: ['technical_support'],
                requiredStep: 'technical_services'
            }
        },

        support_hours: {
            id: 'support_hours',
            type: 'choice',
            question: {
                en: 'What are your preferred support hours?\n1. During working hours\n2. 24/7\n3. Flexible'
            },
            options: {
                '1': { value: 'working_hours', nextStep: 'existing_system_support' },
                '2': { value: '24_7', nextStep: 'existing_system_support' },
                '3': { value: 'flexible', nextStep: 'existing_system_support' }
            }
        },

        existing_system_support: {
            id: 'existing_system_support',
            type: 'choice',
            question: {
                en: 'Do you have an existing system or website that needs support?\n1. Yes\n2. No'
            },
            options: {
                '1': { value: 'yes', nextStep: 'support_problems' },
                '2': { value: 'no', nextStep: 'check_next_tech_service' }
            }
        },

        support_problems: {
            id: 'support_problems',
            type: 'choice',
            question: {
                en: 'What problems are you currently facing?\n1. Slow performance/Errors\n2. Integration problems\n3. Delays in updates\n4. Multiple issues'
            },
            options: {
                '1': { value: ['slow_errors'], nextStep: 'check_next_tech_service' },
                '2': { value: ['integration_problems'], nextStep: 'check_next_tech_service' },
                '3': { value: ['update_delays'], nextStep: 'check_next_tech_service' },
                '4': { value: ['slow_errors', 'integration_problems', 'update_delays'], nextStep: 'check_next_tech_service' }
            }
        },

        // -----------------------------
        // Financial Services Branch
        // -----------------------------
        financial_services: {
            id: 'financial_services',
            type: 'choice',
            question: {
                en: 'Financial & Administrative Services - Select what you need:\n1. Financial Supervision & Monitoring\n2. Financial Consulting\n3. Financial Structuring & Feasibility Studies\n4. Administrative & Operational Services\n5. Multiple services'
            },
            options: {
                '1': { value: ['financial_supervision'], nextStep: 'financial_supervision_questions' },
                '2': { value: ['financial_consulting'], nextStep: 'financial_consulting_questions' },
                '3': { value: ['financial_structuring'], nextStep: 'financial_structuring_questions' },
                '4': { value: ['admin_services'], nextStep: 'admin_services_questions' },
                '5': { value: 'multiple', nextStep: 'financial_multi_select' }
            }
        },


        financial_multi_select: {
            id: 'financial_multi_select',
            type: 'multi_choice',
            question: {
                en: 'Select all Financial services you need (enter numbers separated by commas):\n1. Financial Supervision & Monitoring\n2. Financial Consulting\n3. Financial Structuring & Feasibility Studies\n4. Administrative & Operational Services'
            },
            options: {
                '1': { value: ['financial_supervision'], nextStep: 'financial_supervision_questions' },
                '2': { value: ['financial_consulting'], nextStep: 'financial_consulting_questions' },
                '3': { value: ['financial_structuring'], nextStep: 'financial_structuring_questions' },
                '4': { value: ['admin_services'], nextStep: 'admin_services_questions' },
            },
            nextStep: 'financial_supervision_questions',
            conditionalFlow: true
        },


        // Financial Supervision Questions
        financial_supervision_questions: {
            id: 'financial_supervision_questions',
            type: 'choice',
            question: {
                en: 'Do you have an accountant or financial officer within your company?\n1. Yes\n2. No'
            },
            options: {
                '1': { value: 'yes', nextStep: 'supervision_tools' },
                '2': { value: 'no', nextStep: 'supervision_tools' }
            },
            conditional: {
                requiredValues: ['financial_supervision'],
                requiredStep: 'financial_services'
            }
        },


        supervision_tools: {
            id: 'supervision_tools',
            type: 'choice',
            question: {
            },
            // Financial Consulting Questions
            financial_consulting_questions: {
                id: 'financial_consulting_questions',
                type: 'choice',
                question: {
                    en: 'What area do you need financial consulting in?\n1. Investment guidance\n2. Budgeting & cost control\n3. Financial risk management\n4. Multiple areas'
                },
                options: {
                    '1': { value: ['investment_guidance'], nextStep: 'check_next_financial_service' },
                    '2': { value: ['budgeting'], nextStep: 'check_next_financial_service' },
                    '3': { value: ['risk_management'], nextStep: 'check_next_financial_service' },
                    '4': { value: ['investment_guidance', 'budgeting', 'risk_management'], nextStep: 'check_next_financial_service' }
                },
                conditional: {
                    requiredValues: ['financial_consulting'],
                    requiredStep: 'financial_services'
                }
            },


            // Financial Structuring Questions
            financial_structuring_questions: {
                id: 'financial_structuring_questions',
                type: 'choice',
                question: {
                    en: 'What type of structuring or study do you need?\n1. Feasibility study\n2. Business restructuring\n3. Valuation\n4. Multiple'
                },
                options: {
                    '1': { value: ['feasibility_study'], nextStep: 'check_next_financial_service' },
                    '2': { value: ['business_restructuring'], nextStep: 'check_next_financial_service' },
                    '3': { value: ['valuation'], nextStep: 'check_next_financial_service' },
                    '4': { value: ['feasibility_study', 'business_restructuring', 'valuation'], nextStep: 'check_next_financial_service' }
                },
                conditional: {
                    requiredValues: ['financial_structuring'],
                    requiredStep: 'financial_services'
                }
            },


            // Admin Services Questions
            admin_services_questions: {
                id: 'admin_services_questions',
                type: 'choice',
                question: {
                    en: 'Which administrative service do you require?\n1. Payroll\n2. HR operations\n3. Procurement support\n4. General administration\n5. Multiple'
                },
                options: {
                    '1': { value: ['payroll'], nextStep: 'check_next_financial_service' },
                    '2': { value: ['hr_ops'], nextStep: 'check_next_financial_service' },
                    '3': { value: ['procurement_support'], nextStep: 'check_next_financial_service' },
                    '4': { value: ['general_admin'], nextStep: 'check_next_financial_service' },
                    '5': { value: ['payroll', 'hr_ops', 'procurement_support', 'general_admin'], nextStep: 'check_next_financial_service' }
                },
                conditional: {
                    requiredValues: ['admin_services'],
                    requiredStep: 'financial_services'
                }
            },


            check_next_financial_service: {
                id: 'check_next_financial_service',
                type: 'info',
                message: {
                    en: 'Noted your Financial services selection.'
                },
                nextStep: 'completion_name'
            },
        },

        // Corporate Management & Consulting Services
        corporate_services: {
            id: 'corporate_services',
            type: 'choice',
            question: {
                en: 'Corporate Management & Consulting - Select service:\n1. Strategic planning\n2. Organizational restructuring\n3. HR strategy\n4. Governance consulting\n5. Multiple services'
            },
            options: {
                '1': { value: ['strategic_planning'], nextStep: 'check_next_corporate_service' },
                '2': { value: ['org_restructuring'], nextStep: 'check_next_corporate_service' },
                '3': { value: ['hr_strategy'], nextStep: 'check_next_corporate_service' },
                '4': { value: ['governance_consulting'], nextStep: 'check_next_corporate_service' },
                '5': { value: ['strategic_planning', 'org_restructuring', 'hr_strategy', 'governance_consulting'], nextStep: 'check_next_corporate_service' },
                '6': { value: ['multiple'], nextStep: 'check_next_corporate_service' }
            }
        },


        check_next_corporate_service: {
            id: 'check_next_corporate_service',
            type: 'info',
            message: {
                en: 'Noted your corporate service request.'
            },
            nextStep: 'completion_name'
        },


        // -----------------------------
        // Completion Step with user info
        // -----------------------------
        completion_name: {
            id: 'completion_name',
            type: 'text',
            question: {
                en: 'Please provide your full name:'
            },
            nextStep: 'completion_email'
        },


        completion_email: {
            id: 'completion_email',
            type: 'text',
            question: {
                en: 'Please provide your email address:'
            },
            nextStep: 'completion_company'
        },


        completion_company: {
            id: 'completion_company',
            type: 'text',
            question: {
                en: 'Please provide your company name (or type "none"):'
            },
            nextStep: 'completion'
        },


        completion: {
            id: 'completion',
            type: 'completion',
            message: {
                en: '✅ Thank you for your time! We will get in touch with you soon.'
            }
        },
        confirmation_name: {
            id: "confirmation_name",
            type: "text",
            question: {
                en: "Please enter your full name:"
            },
            nextStep: "confirmation_email"
        },

        confirmation_email: {
            id: "confirmation_email",
            type: "text",
            question: {
                en: "Please enter your email address:"
            },
            nextStep: "confirmation_phone"
        },

        confirmation_phone: {
            id: "confirmation_phone",
            type: "text",
            question: {
                en: "Please enter your phone number:"
            },
            nextStep: "confirmation_review"
        },

        confirmation_review: {
            id: "confirmation_review",
            type: "completion", // special step
            message: {
                en: "Here’s a summary of your answers:\n\n{{report}}\n\n✅ Reply 'confirm' to submit or 'restart' to redo."
            }
        },
        service_done_prompt: {
            id: "service_done_prompt",
            type: "info",
            message: {
                en: "✅ This service is complete. Please type 'next' to proceed to the next service.",
                ar: "✅ تم الانتهاء من هذه الخدمة. الرجاء كتابة 'التالي' للانتقال إلى الخدمة التالية."
            },
            nextStep: "check_next_service"
        }

    }
};


export default enhancedQuestionnaire;