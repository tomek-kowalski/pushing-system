import fetch from "node-fetch";

export default async function handler(req, res) {
    const { phoneNumber } = req.query;

    if (!phoneNumber) {
        return res.status(400).json({ error: "Phone number is required" });
    }

    const apiKey = process.env.IPQS_API_KEY;
    const url = `https://www.ipqualityscore.com/api/json/phone/${apiKey}/${encodeURIComponent(phoneNumber)}`;

    try {
        const response = await fetch(url, { cache: "no-store" });

        if (!response.ok) {
            return res.status(response.status).json({ error: "Failed to fetch data" });
        }

        const data = await response.json();

        console.log("Fetched data:", data);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
