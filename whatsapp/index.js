import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import qrcode from "qrcode-terminal";
import chatbotService from "../src/services/chatbotService.js";

let isConnecting = false;
let sock = null;

export async function connectToWhatsApp() {
  if (isConnecting) {
    return sock;
  }

  isConnecting = true;

  try {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");
    const { version } = await fetchLatestBaileysVersion();

    sock = makeWASocket({
      version,
      auth: state,
      printQRInTerminal: false,
      browser: ["WhatsApp Bot", "Chrome", "1.0.0"],
      connectTimeoutMs: 60_000,
      defaultQueryTimeoutMs: 60_000,
      keepAliveIntervalMs: 30_000,
      markOnlineOnConnect: true,
      syncFullHistory: false,
      // FIX: Remove or use proper Pino logger
      logger: {
        level: 'silent',
        // Add the child method
        child: () => ({
          level: 'silent',
          trace: () => { },
          debug: () => { },
          info: () => { },
          warn: () => { },
          error: () => { },
          fatal: () => { }
        }),
        trace: () => { },
        debug: () => { },
        info: () => { },
        warn: () => { },
        error: () => { },
        fatal: () => { }
      }
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        console.log("📱 Scan this QR code:");
        qrcode.generate(qr, { small: true });
        console.log("\n🔗 Or use this link:");
        console.log(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qr)}\n`);
      }

      if (connection === "close") {
        isConnecting = false;

        const statusCode = lastDisconnect?.error instanceof Boom
          ? lastDisconnect.error.output.statusCode
          : undefined;

        console.log("❌ Connection closed. Status code:", statusCode);

        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

        if (shouldReconnect) {
          console.log("⏳ Reconnecting in 5 seconds...");
          setTimeout(() => {
            connectToWhatsApp();
          }, 5000);
        } else {
          console.log("🚫 Logged out, please restart and scan QR code");
        }
      } else if (connection === "open") {
        isConnecting = false;
        console.log("✅ Connected to WhatsApp successfully!");
      }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
      const msg = messages[0];
      if (!msg.message) return;
      if (msg.key.fromMe) return;
      if (msg.key.remoteJid.endsWith("@g.us")) return;
      if (msg.key.remoteJid === "status@broadcast") return;

      const sender = msg.key.remoteJid;
      const textMessage =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        "";

      console.log("📩 From:", sender, "| Text:", textMessage);

      // 🧪 TEST MODE — only reply to your own number
      const MY_TEST_NUMBER = "201555068174@s.whatsapp.net"; // ← put your real WhatsApp JID here
      if (sender !== MY_TEST_NUMBER) {
        console.log("🚫 Ignored message from", sender, "(Test mode active)");
        return;
      }

      const delay = Math.floor(Math.random() * 3000 + 2000);

      setTimeout(async () => {
        try {
          const result = await chatbotService.processMessage(sender, textMessage);
          if (result === undefined) {
            console.log("No reply");
            return;
          };

          if (result.reply) {
            await sock.sendMessage(sender, { text: result.reply });
            console.log("✅ Replied to", sender);
          }
        } catch (error) {
          console.error("❌ Failed to send message:", error.message);
        }
      }, delay);
    });

    return sock;
  } catch (error) {
    isConnecting = false;
    console.error("❌ Error connecting to WhatsApp:", error.message);
    throw error;
  }
}

// export async function sendMessageToNumber(number, message) {
//   try {
//     if (!sock) throw new Error("WhatsApp client not connected yet.");

//     const jid = number.includes("@s.whatsapp.net")
//       ? number
//       : `${number}@s.whatsapp.net`;

//     await sock.sendMessage(jid, { text: message });
//     console.log(`📤 Sent message to ${jid}`);
//     return { success: true };
//   } catch (err) {
//     console.error("❌ Failed to send message:", err.message);
//     return { success: false, error: err.message };
//   }
// }