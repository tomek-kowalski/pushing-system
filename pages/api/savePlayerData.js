import { database } from "../../dbConnect";
import { ref, update } from "firebase/database";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id, name, phone, amount, interval } = req.body;

    if (!id || !name || !phone || !amount || !interval) {
      return res.status(400).json({ error: "All fields are required, including player ID" });
    }

    const playerRef = ref(database, `players/${id}`);

    await update(playerRef, { name, phone, amount, interval });

    return res.status(200).json({ success: true, message: "Player updated successfully" });
  } catch (error) {
    console.error("🔥 Firebase Error:", error.message || error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
