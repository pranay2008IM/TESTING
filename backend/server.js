import express, { response } from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());

// memory storage → keeps file in RAM
const upload = multer({ storage: multer.memoryStorage() });

const ai =new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY})
console.log(process.env.GEMINI_API_KEY)
// Simple test GET route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// THIS route accepts FormData (image + id)
app.post("/api/generation", upload.single("image"), async (req, res) => {
  try {
    const id = req.body.id;           // ID from formdata
    const file = req.file;            // Image file from the upload
    const response=await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Explain how AI works in a few words with the"+String({id}),
  });
    console.log(response.text);
    console.log("ID:", id);
    console.log(file);
    return res.status(200).send({
      message: response.text,
    });

  } catch (err) {
    console.error("Backend error:", err);

    // ✅ send error response
    return res.status(500).send({
      error: "Backend failed to connect",
    });
  }
});

// Render listens on this port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
