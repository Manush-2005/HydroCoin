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

let producerSchema = new mongoose.Schema({
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

const Producer = mongoose.model("Producer", producerSchema);
export default Producer;
