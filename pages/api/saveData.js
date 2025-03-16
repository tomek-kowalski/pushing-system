import { database } from "../../dbConnect";
import { ref, push } from "firebase/database";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, phone, amount, interval } = req.body;

    if (!name || !phone || !amount || !interval) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const dataRef = ref(database, "players");
    //console.log("Saving to Firebase:", { name, phone, amount, interval });

    await push(dataRef, { name, phone, amount, interval });

    return res.status(200).json({ success: true, message: "Data saved successfully" });
  } catch (error) {
    console.error("🔥 Firebase Error:", error.message || error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
