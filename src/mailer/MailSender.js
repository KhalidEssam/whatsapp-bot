import nodemailer from "nodemailer";

// Setup transporter with your business domain SMTP
const transporter = nodemailer.createTransport({
    host: "mail.exoln.com", // or smtp.office365.com / smtp.gmail.com
    port: 465,
    secure: true, // true for 465, false for 587
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});
function reportToHtmlTable(report) {
    const rows = report
        .split("❓")
        .filter(Boolean)
        .map(block => {
            const [question, answer] = block.split("➡️");
            return `
        <tr>
          <td style="border:1px solid #ddd; padding:8px;"><b>${question.trim()}</b></td>
          <td style="border:1px solid #ddd; padding:8px;">${answer ? answer.trim() : ""}</td>
        </tr>
      `;
        })
        .join("");

    return `
    <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
      <thead>
        <tr>
          <th style="border:1px solid #ddd; padding:8px; background:#f4f4f4;">Question</th>
          <th style="border:1px solid #ddd; padding:8px; background:#f4f4f4;">Answer</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}


// Function to send email
export async function sendManagerReport(sessionData) {
    try {
        const reportHtml = reportToHtmlTable(sessionData.report);
        console.log("📧 Sending email...", reportHtml);

        const info = await transporter.sendMail({
            from: " Exoln Whatsapp Bot "+process.env.MAIL_USER,
            to: "info@exoln.com , khaled.esam@bmindconsult.com",
            subject: "New inquiry report has been submitted ✔",
            html: `
    <h3>New Session Recorded</h3>
    <p><b>ID:</b> ${sessionData.userId}</p>
    <p><b>Name:</b> ${sessionData.name}</p>
    <p><b>Time:</b> ${new Date().toLocaleString()}</p>
    <hr/>
    ${reportHtml}
  `
        });


        console.log("✅ Email sent:", info.messageId);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
}