const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");

const app = express();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5176",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.post("/api/auth/google", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    res.cookie("session", JSON.stringify(payload), {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.sendStatus(200);
  } catch (err) {
    console.error("Token verification failed", err);
    res.status(401).json({ error: "Invalid token" });
  }
});

app.get("/api/me", (req, res) => {
  try {
    const user = JSON.parse(req.cookies.session || "{}");
    res.json(user);
  } catch {
    res.status(401).json({ error: "Not logged in" });
  }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("session");
  res.sendStatus(200);
});

app.get("/gmen", (req, res) => {
  res.status(500).send("G-men Over here ");
});

app.listen(3000, () => {
  console.log("Backend server running on http://localhost:3000");
});
