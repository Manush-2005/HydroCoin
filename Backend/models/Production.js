import mongoose from "mongoose";

let productionSchema = new mongoose.Schema({
  producer_wallet_id: {
    type: "string",
    required: true,
  },
  receiver_wallet_id: {
    type: "string",
    required: true,
  },
  date_time: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  renewable_resource: {
    type: "string",
    required: true,
  },
  status: {
    type: "string",
    enum: [
      "pending",
      "approved",
      "rejected",
      "coins_granted"
    ],
    default: "pending",
  }
});

const Production = mongoose.model("Production", productionSchema);
export default Production;
