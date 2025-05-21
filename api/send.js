// api/send.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Nur POST erlaubt" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Nachricht fehlt" });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: message })
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Fehler beim Senden an Discord" });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Fehler:", err);
    res.status(500).json({ error: "Serverfehler" });
  }
}
