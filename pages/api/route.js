import { getDatabase, ref, get } from "firebase/database";
import twilio from "twilio";

export default async function handler(req, res) {

    console.log("Received request with headers:", req.headers);
    if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
        console.log("Unauthorized request");
        return res.status(401).end('Unauthorized');
    }
    
    if (req.method !== "GET") {
        console.log("Invalid method:", req.method);
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
    const client = twilio(accountSid, authToken);
    const db = getDatabase();
    const playersRef = ref(db, "players");

    try {
        console.log("Fetching players data from Firebase...");
        const snapshot = await get(playersRef);

        if (!snapshot.exists()) {
            console.log("No players found.");
            return res.status(200).json({ message: "No players found." });
        }

        const players = snapshot.val();
        console.log("Players data fetched:", players);

   
        const messages = Object.values(players).map(async (player) => {
            console.log(`Sending message to ${player.name} at +48${player.phone}`);
            return client.messages.create({
                body: `P. ${player.name}, mamy nie rozliczone ${player.amount} zl za ostatnie prace. 
                       Proszę o uregulowanie płatności. Tomasz Kowalski`,
                messagingServiceSid,
                to: `+48${player.phone}`,
            })
            .then(message => {
                console.log(`Message sent to ${player.name}: SID ${message.sid}`);
                return message;
            })
            .catch(error => {
                console.error(`Error sending message to ${player.name}:`, error);
                throw error;
            });
        });

        await Promise.all(messages);
        console.log("All messages have been sent successfully.");
        return res.status(200).json({ success: true, message: "Messages sent!" });
    } catch (error) {
        console.error("Error sending messages:", error);
        return res.status(500).json({ error: "Failed to send messages" });
    }
}
