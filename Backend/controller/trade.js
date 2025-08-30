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
