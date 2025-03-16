import { database } from "../../dbConnect.js";
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
    await push(dataRef, { name, phone, amount, interval });

    res.status(200).json({ success: true, message: "Data saved successfully" });
  } catch (error) {
    console.error("Firebase Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
