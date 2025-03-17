import { database } from "../../dbConnect";
import { ref, get } from "firebase/database";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Missing player ID" });
    }

    const playerRef = ref(database, `players/${id}`);
    const snapshot = await get(playerRef);

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "No data found" });
    }

    return res.status(200).json({ success: true, data: snapshot.val() });
  } catch (error) {
    console.error("🔥 Firebase Error:", error.message || error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
