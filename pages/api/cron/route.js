import { getDatabase, ref, get } from "firebase/database";
import twilio from "twilio";

export default async function handler(req, res) {

    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).end('Unauthorized');
      }
    
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

    const client = twilio(accountSid, authToken);
    const db = getDatabase();
    const playersRef = ref(db, "players");

    try {
        const snapshot = await get(playersRef);

        if (!snapshot.exists()) {
            return res.status(200).json({ message: "No players found." });
        }

        const players = snapshot.val();

        const messages = Object.values(players).map(async (player) => {
            return client.messages.create({
                body: `P. ${player.name}, mamy nie rozliczone ${player.amount} zl za ostanie prace. 
                       Proszę o uregulowanie płatności. Tomasz Kowalski`,
                messagingServiceSid,
                to: `+48${player.phone}`,
            });
        });

        await Promise.all(messages);
        return res.status(200).json({ success: true, message: "Messages sent!" });
    } catch (error) {   
        console.error("Error sending messages:", error);
        return res.status(500).json({ error: "Failed to send messages" });
    }
}
