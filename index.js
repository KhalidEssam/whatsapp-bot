import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "baileys";
import { Boom } from "@hapi/boom";
import qrcode from "qrcode-terminal";

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info");

  const sock = makeWASocket({
    auth: state,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      qrcode.generate(qr, { small: true });
    }

    if (connection === "close") {
      const statusCode = (lastDisconnect?.error instanceof Boom)
        ? lastDisconnect.error.output.statusCode
        : undefined;

      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

      console.log("connection closed, reconnecting:", shouldReconnect);

      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === "open") {
      console.log("✅ Connected to WhatsApp");
      sendFirstMessage(sock);
    }
  });

  return sock;
}

async function sendFirstMessage(sock) {
  const jid = "201555068174@s.whatsapp.net"; // replace with real number
  const message = "Hello! Cool connection 🚀";
  await sock.sendMessage(jid, { text: message });
  console.log("✅ Message sent:", message);
}

connectToWhatsApp();
