// whatsapp/index.js - FIXED VERSION
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from "baileys";
import { Boom } from "@hapi/boom";
import qrcode from "qrcode-terminal";
import chatbotService from "../src/services/chatbotService.js";

let isConnecting = false; // Prevent multiple connection attempts
let sock = null; // store global socket instance

export async function connectToWhatsApp() {
  if (isConnecting) {
    //console.log("⚠️ Connection already in progress, skipping...");
    return sock;
  }

  isConnecting = true;

  try {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");

    sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      browser: ["WhatsApp Bot", "Chrome", "1.0.0"],
      connectTimeoutMs: 60_000,
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        console.log("📱 Scan this QR code:");
        qrcode.generate(qr, { small: true });

        // Also print a copyable link
        console.log("\n🔗 Copy this QR string into any online QR generator:");
        console.log(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qr)}\n`);
      }


      if (connection === "close") {
        isConnecting = false;

        const statusCode =
          lastDisconnect?.error instanceof Boom
            ? lastDisconnect.error.output.statusCode
            : undefined;

        //console.log("❌ Connection closed. Status code:", statusCode);

        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
        //console.log("🔄 Should reconnect:", shouldReconnect);

        if (shouldReconnect) {
          //console.log("⏳ Reconnecting in 5 seconds...");
          setTimeout(() => {
            connectToWhatsApp();
          }, 5000);
        } else {
          //console.log("🚫 Logged out, not reconnecting");
        }
      } else if (connection === "open") {
        isConnecting = false;
        //console.log("✅ Connected to WhatsApp");
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

      //console.log("📩 From:", sender, "| Text:", textMessage);

      const delay = Math.floor(Math.random() * (5000 - 2000 + 1));
      //console.log(`⏳ Waiting ${delay / 1000}s before replying...`);

      setTimeout(async () => {
        try {
          const result = await chatbotService.processMessage(sender, textMessage);
          console.log("✅ Replied to", sender, "| Reply:", result);

          if (result.reply || result.reply !== null) {
            await sock.sendMessage(sender, { text: result.reply });
            //console.log("✅ Replied to", sender, "| Reply:", result.reply);
          } else {
            //console.log("⚠️ No reply generated for", sender);
          }
        } catch (error) {
          //console.error("❌ Failed to send message:", error.message);
        }
      }, delay);

    });

    return sock;
  } catch (error) {
    isConnecting = false;
    //console.error("❌ Error connecting to WhatsApp:", error.message);
    throw error;
  }
}

// ✅ Helper to send message to a specific number
export async function sendMessageToNumber(number, message) {
  try {
    if (!sock) throw new Error("WhatsApp client not connected yet.");

    // format number → WhatsApp JID
    const jid = number.includes("@s.whatsapp.net")
      ? number
      : `${number}@s.whatsapp.net`;

    await sock.sendMessage(jid, { text: message });
    //console.log(`📤 Sent message to ${jid}: ${message}`);
    return { success: true };
  } catch (err) {
    //console.error("❌ Failed to send message:", err.message);
    return { success: false, error: err.message };
  }
}
