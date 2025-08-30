import mongoose from "mongoose";

let tradeSchema = new mongoose.Schema({
  producer_wallet_id: {
    type: "string",
    required: true,
  },
  producer_name: {
    type: "string",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  coins_to_sell: {
    type: Number,
    required: true,
  },
  prize_of_coin: {
    type: Number,
    required: true
  }
});

const Trade = mongoose.model("Trade", tradeSchema);
export default Trade;
