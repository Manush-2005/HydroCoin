import Joi from "joi";

const productionValidationSchema = Joi.object({
  producer_wallet_id: Joi.string().required(),
  receiver_wallet_id: Joi.string().required(),
  date_time: Joi.date().required(),
  quantity: Joi.number().positive().required(),
  renewable_resource: Joi.string().required(),
  status: Joi.string()
    .valid("pending", "approved", "rejected", "coins_granted")
    .default("pending"),
});

export default productionValidationSchema;
