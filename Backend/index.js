import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { addProducer } from "./controller/producer.js";
import { addGovernment } from "./controller/government.js";
import { addProduction, getAllProductionsOfGovernment } from "./controller/production.js";
import { mintTokens } from "./controller/MintToken.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;
function validateObjectId(paramName = "id") {
  return (req, res, next) => {
    const id = req.params[paramName] || req.body[paramName] || req.query[paramName];

    if (!id) {
      return res.status(400).json({ error: `${paramName} is required` });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${paramName} is not a valid ObjectId` });
    }

    next();
  };
}

app.listen(PORT, async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
  console.log(`🚀 Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the HydroCoin API");
});

// Sign Up Routes
app.post("/signup/producer", addProducer);
app.post("/signup/government", addGovernment);

// Production Of H2 Routes
app.post("/submit-production", addProduction);
app.get("/gov/:id/productions", getAllProductionsOfGovernment);


// Mint new token route
app.post("/mint-tokens", mintTokens);