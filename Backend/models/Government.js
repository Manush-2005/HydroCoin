import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  }
});

let governmentSchema = new mongoose.Schema({
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  name: {
    type: "string",
    required: true,
  },
  address: {
    type: "string",
    required: true,
  },
  location: {
    type: locationSchema,
    required: true,
  },
  walletId: {
    type: String,
    required: true
  }
});

const Government = mongoose.model("Government", governmentSchema);
export default Government;
