require("dotenv").config();
const express = require("express");
const path = require("path");

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(express.json());
app.use(express.static("public"));

console.log("✅ Server is starting...");

// Check if all required environment variables are present
if (!process.env.BREVO_API_KEY || !process.env.EMAIL_FROM || !process.env.EMAIL_TO) {
    console.error("❌ Missing environment variables! Check your .env file.");
    process.exit(1); // Exit the server if crucial env variables are missing
}

app.post("/send-email", async (req, res) => {
    console.log("📩 Received a request to send an email.");
    
    const { musicDb, vocalsDb, isMuted } = req.body;
    const muteText = isMuted ? "Yes" : "No";

    console.log(`🎵 Music Volume: ${musicDb} dB`);
    console.log(`🎤 Vocals Volume: ${vocalsDb} dB`);
    console.log(`🔇 Mute Video Audio: ${muteText}`);

    const emailData = {
        sender: { email: process.env.EMAIL_FROM },
        to: [{ email: process.env.EMAIL_TO }],
        subject: "Client Volume Settings",
        textContent: `Music Volume: ${musicDb} dB\nVocals Volume: ${vocalsDb} dB\nMute Video Audio: ${muteText}`,
    };

    console.log("📨 Sending email with the following data:", emailData);

    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY
            },
            body: JSON.stringify(emailData),
        });

        console.log(`📡 API Response Status: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ Brevo API Error:", errorText);
            return res.status(500).send("Error sending email: " + errorText);
        }

        console.log("✅ Email sent successfully!");
        res.send("Email sent successfully!");
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).send("Error processing request");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
