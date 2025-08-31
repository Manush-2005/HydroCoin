import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import {
  addProduction,
  getAllProductionsOfGovernment,
  getAllApprovedProductionsOfGovernment,
  getProductionOfUser,
} from "./controller/production.js";
import {
  addGovernment,
  approveProduction,
  getAllGovernmentEntities,
  government,
  loginGovernment,
  rejectProduction,
} from "./controller/government.js";
import { mintTokens } from "./controller/MintToken.js";
import { addProducer, loginProducer, producer } from "./controller/producer.js";
import authMiddleware from "./middlewares/auth-middleware.js";
import authGovMiddleware from "./middlewares/gov-middleware.js";
import { addTrade, getAllTrades } from "./controller/trade.js";
import { verify,payment } from "./controller/payment.js";

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

app.get("/", (req, res) => {
  res.send("Welcome to the HydroCoin API");
});

// Auth Producer Routes
app.post("/signup/producer", addProducer);
app.post("/login/producer", loginProducer);
app.get("/producer", authMiddleware, producer);
app.post("/producer/productions", getProductionOfUser);

app.post("/signup/government", addGovernment);
app.post("/login/government", loginGovernment);
app.get("/government", authGovMiddleware, government);

// Production Of H2 Routes
app.post("/submit-production", addProduction);

// Gov Routes
app.get("/gov/:id/pending-productions", getAllProductionsOfGovernment);
app.get("/gov/:id/approved-productions", getAllApprovedProductionsOfGovernment);
app.get("/gov/:govId/pro/:proId/approve", approveProduction);
app.get("/gov/:govId/pro/:proId/reject", rejectProduction);
app.get("/governments", getAllGovernmentEntities);

// Mint new token route
app.post("/mint-tokens", mintTokens);

// Trade routes
app.post("/submit-trade", addTrade);
app.get("/trades", getAllTrades);

// payment routes to the marketplace

app.post("/payment", payment);
app.post("/verify", verify);
