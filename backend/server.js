import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import jwt from "jsonwebtoken";
import verifyToken from "./middleware/verifytokens.js";
import ratelimit from "express-rate-limit";

dotenv.config();

const app = express();

app.options("*", cors());

app.use(cors({
  origin:process.env.FRONT_END,
  methods: ["GET","POST","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
}));


app.use(express.json());

/*app.use("/api",ratelimit({ windowMs: 15 * 60 * 1000,
  max: 100}))*/
const upload = multer({ storage: multer.memoryStorage() ,limits:{fileSize: 5*1024*1024}});

const ai =new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY})
// Simple test GET route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});


app.use("/api",ratelimit({
  windowMs:15*60*1000,
  max:30
}));

app.get("/api/token",ratelimit({
  windowMs:15*60*1000,
  max:10,
  }),(req,res)=>{
  const token=jwt.sign({ scope: "generate", aud: "public-app" },
    process.env.JWT_SECRET,
    {expiresIn:"10m"}
  );
  res.json({token});
})





// THIS route accepts FormData (image + id)
app.post("/api/generation",verifyToken, upload.single("image"), async (req, res) => {
  try {
    const id = req.body.id; 
    const textfile=req.body.text;          // ID from formdata
    const file = req.file;            // Image file from the upload
    const response=await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: textfile,
      config: {
      maxOutputTokens: 500,
      temperature: 0.6,
    },
  });
    /*console.log(response.text);
    console.log("ID:", id);
    console.log(file);*/
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
