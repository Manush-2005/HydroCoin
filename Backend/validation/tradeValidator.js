import joi from "joi";

const tradeSchemaValidation = joi.object({
  producer_wallet_id: joi.string().required(),
  producer_name: joi.string().required(),
  coins_to_sell: joi.number().required(),
  prize_of_coin: joi.number().required(),
});

export default tradeSchemaValidation;
