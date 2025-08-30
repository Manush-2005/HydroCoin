import Trade from "../models/Trade.js";
import tradeSchemaValidation from "../validation/tradeValidator.js";

export const addTrade = async (req, res) => {
  let { error } = tradeSchemaValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let trade = new Trade(req.body);

  trade
    .save()
    .then(async () => {
      res.status(200).json({
        message: "Registration successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.send("Error Occurred !!!");
    });
};

export const getAllTrades = async (req, res) => {
  try {
    let trades = await Trade.find({});
    return res.status(200).json({ message: "success", trades });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
