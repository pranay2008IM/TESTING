import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Simple test GET route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Simple test POST route
app.post("/api/test", (req, res) => {
  const { name } = req.body;

  res.json({
    message: `Hello ${name}, your backend API is working! 🚀`
  });
});

// Render will use PORT (important)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
