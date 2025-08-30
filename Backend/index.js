import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { addProducer } from "./controller/producer.js";
import { addGovernment } from "./controller/government.js";
import { addProduction } from "./controller/production.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

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

// Sign Up Routes
app.post("/signup/producer", addProducer);
app.post("/signup/government", addGovernment);

// Production Of H2 Routes
app.post("/submit-production", addProduction);