import express from "express";
import cors from "cors";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import * as fs from "node:fs";

dotenv.config();

const app = express();
app.use(cors());

// memory storage → keeps file in RAM
const upload = multer({ storage: multer.memoryStorage() });

// Simple test GET route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// THIS route accepts FormData (image + id)
app.post("/api/generation", upload.single("image"), async (req, res) => {
  try {
    const id = req.body.id;           // ID from formdata
    const file = req.file;            // Image file

    console.log("ID:", id);
    console.log("File received:", file.originalname);

    // ----------------------------
    // CALL GOOGLE GEN AI FOR IMAGE GENERATION
    // (This is the part YOU will fill)
    // For now, return the same image back
    // ----------------------------
    const prompt="make the image just like this for profile picture";
    const apikey=process.env.GEMINI_API_KEY;
    console.log("API KEY: ",apikey ? "LOADED" : "NOT FOUND");
    const ai=new GoogleGenAI({apikey});
    

    const response=await ai.models.generateContent({
      model: "gemini-2.5",
      contents: [{text:prompt},{
        inlineData:{
          mimeType:file.mimetype,
          data:file.buffer.toString("base64"),
        },
      },],
    });
    let generatedbuffer=null;
    for(const part of response.candidates[0].content.parts){
       if(part.inlineData){
        generatedbuffer=Buffer.from(part.inlineData.data,"base64");
      }
    }
    if(!generatedbuffer){
      return res.status(500).json({message:"no image generated"});
    }
      // dummy response

    // return an image binary
    res.set({
      "Content-Type": file.mimetype,
      "Content-Length": generatedBuffer.length,
    });

    res.send(generatedbuffer);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Image generation failed" });
  }
});

// Render listens on this port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
