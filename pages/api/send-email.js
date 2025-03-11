import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "All fields are required." });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "kc.tomasz.kowalski@gmail.com",
                pass: "dbfy vinq fvro xaia",
            },
        });

        const mailOptions = {
            from: email,
            to: "tomasz.kowalski@kowalski-consulting.com", 
            subject: "Pushing system melduje",
            text: `Imię: ${name}\nEmail: ${email}\nWiadomość:\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: "Email sent successfully!" });

    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ success: false, error: "Failed to send email." });
    }
}
