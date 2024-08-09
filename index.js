require('dotenv').config();  // Load environment variables

const express = require("express");
const shortid = require("shortid");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8001;

// In-memory store for URLs and visit history
const urlStore = {};

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API to generate a new short URL
app.post("/url", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortId = shortid.generate();
  urlStore[shortId] = { redirectURL: url, visitHistory: [] };

  return res.json({ id: shortId });
});

// Redirect to the original URL and track visit history
app.get("/:shortId", (req, res) => {
  const { shortId } = req.params;
  const entry = urlStore[shortId];

  if (entry) {
    entry.visitHistory.push({ timestamp: Date.now() });
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).send("URL not found");
  }
});

// API to get analytics
app.get("/url/:shortId/analytics", (req, res) => {
  const { shortId } = req.params;
  const entry = urlStore[shortId];

  if (entry) {
    return res.json({
      totalClicks: entry.visitHistory.length,
      analytics: entry.visitHistory,
    });
  } else {
    return res.status(404).json({ error: "URL not found" });
  }
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
