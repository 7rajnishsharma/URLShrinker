const { doc, setDoc, getDoc, updateDoc, arrayUnion } = require("firebase/firestore");
const { db } = require("../firebase");  // Import using destructuring
const shortid = require("shortid");

async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    const shortID = shortid.generate();

    await setDoc(doc(db, "urls", shortID), {
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.json({ id: shortID });
  } catch (error) {
    console.error("Error generating short URL:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGetAnalytics(req, res) {
  try {
    const shortId = req.params.shortId;
    const docRef = doc(db, "urls", shortId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return res.json({
        totalClicks: data.visitHistory?.length || 0,
        analytics: data.visitHistory || [],
      });
    }
    return res.status(404).json({ error: "URL not found" });
  } catch (error) {
    console.error("Error getting analytics:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
