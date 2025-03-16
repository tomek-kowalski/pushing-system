import { database } from "../../dbConnect";
import { ref, get, child } from "firebase/database";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  console.log('database get');
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, "players"));

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "No data found" });
    }
    console.log('snapshot',snapshot.val());
    return res.status(200).json({ success: true, data: snapshot.val() });
  } catch (error) {
    console.error("🔥 Firebase Error:", error.message || error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
} 
