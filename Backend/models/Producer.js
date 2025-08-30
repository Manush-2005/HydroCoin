import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
});

let producerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: locationSchema,
    required: true,
  },
  walletId: {
    type: String,
    required: true,
  },
});

const Producer = mongoose.model("Producer", producerSchema);
export default Producer;
