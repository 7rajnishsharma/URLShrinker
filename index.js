const express = require("express");
const urlRoute = require("./routes/url");
const path = require("path");
const { doc, getDoc, updateDoc, arrayUnion } = require("firebase/firestore");
const { db } = require("./firebase");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const docRef = doc(db, "urls", shortId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).send("URL not found");
    }

    await updateDoc(docRef, {
      visitHistory: arrayUnion({ timestamp: Date.now() }),
    });

    res.redirect(docSnap.data().redirectURL);
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
