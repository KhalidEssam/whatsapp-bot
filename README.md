📲 WhatsApp Service Bot

A conversational bot that handles service requests and contact data collection over WhatsApp.
It supports Arabic 🇸🇦 and English 🇬🇧, manages user sessions, and allows generating reports of answered questions.

⚡ Features

🌐 Multi-language support (auto-detects Arabic / English)

📝 Service request surveys

📇 Contact information gathering

⏸️ Session pause, resume, restart

📑 On-demand report generation of user answers

✅ Early finish command to end survey and prepare submission (MongoDB integration pending)

💾 Session persistence via sessionManager

🛠️ Setup
# 1. Clone the repo
[git clone https://github.com/KhalidEssam/whatsapp-bot]
cd whatsapp-bot

# 2. Install dependencies
npm install

# 3. Configure your .env (for DB, WhatsApp client, etc.)

# 4. Start the bot
node server.js

💬 Commands

Users can type these commands anytime:

Command	Description
restart	🔄 Restarts the session and resets language detection
stop	🛑 Stops the session completely
delay	⏸️ Pauses the session (can resume later)
resume	▶️ Resumes a delayed session
report	📑 Generates an on-demand report of answered questions
finish	✅ Ends the survey early and marks answers for submission (DB integration pending)
🌍 Language Detection

Language is auto-detected based on greetings:

Arabic triggers: اهلا, مرحبا, السلام → lang = "ar"

English triggers: hi, hello, hey → lang = "en"

Default fallback: English ("en")

All questions, menus, and system messages respect the detected language.

🧩 Session Management

Each user is tracked by userId (e.g., WhatsApp number).

Example session object
{
  "userId": "201555068174@s.whatsapp.net",
  "lang": "en",
  "active": true,
  "delayed": false,
  "hasSeenMenu": true,
  "mode": "survey",
  "currentStep": "social_content_type",
  "answers": [
    { "step": "main_service_type", "value": "marketing_creative" },
    { "step": "marketing_services", "value": ["social_media_management"] }
  ]
}

Session Behaviors

Restart → clears session, resets language

Stop → sets active = false

Delay → sets delayed = true

Resume → continues from currentStep

Finish → locks session for submission

📑 Report Generation

Reports can be generated at any time using the report command.

Example (English)
📑 Report of answers:

❓ What type of service do you need?
➡️ Marketing & Creative Services

❓ Which marketing services do you need?
➡️ Social Media Account Management

Example (Arabic)
📑 تقرير الإجابات:

❓ ما نوع الخدمة التي تحتاجها؟
➡️ خدمات التسويق والإبداع

❓ أي خدمات تسويقية تحتاج؟
➡️ إدارة حسابات وسائل التواصل الاجتماعي

🔮 Roadmap

 MongoDB integration for final submission (finish)

 Export reports to PDF/Excel

 Rich media support (uploads, file sharing)

 Admin dashboard to monitor sessions

👨‍💻 Developer Notes

Questions and flows are defined in:
src/services/questionnaireHelper.js

Core processing logic:
src/services/processMessage.js

Report generation:
src/services/reportGenerator.js
