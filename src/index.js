const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(require("../firebase-service-key.json")),
});

app.post("/login", async (req, res) => {
  const { token } = req.body;
  try {
    const user = await admin.auth().verifyIdToken(token);
    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Auth Service corriendo en puerto ${PORT}`));
