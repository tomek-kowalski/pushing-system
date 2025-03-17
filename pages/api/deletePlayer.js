import { database } from "../../dbConnect";
import { ref, remove } from "firebase/database";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Missing player ID" });
    }

    const playerRef = ref(database, `players/${id}`);
    await remove(playerRef);

    return res.status(200).json({ success: true, message: "Player deleted successfully" });
  } catch (error) {
    console.error("🔥 Firebase Delete Error:", error.message || error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
