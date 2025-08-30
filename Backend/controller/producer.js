import Producer from "../models/Producer.js";
import producerSchemaValidation from "../validation/producerValidator.js";

//Register Producer
export const addProducer = async (req, res) => {
  let producer = await Producer.findOne({ email: req.body.email });

  if (producer) {
    return res.status(403).json({ message: "Producer already exists" });
  }

  producer = await Producer.findOne({walletId : req.body.walletId});

  if (producer) {
    return res.status(403).json({ message: "Wallet Id already exists" });
  }

  let { error } = producerSchemaValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  producer = new Producer(req.body);

  producer
    .save()
    .then(async () => {
      res.status(200).json({
        msg: "Registration successfully!",
        token: await producer.generateToken(),
        userId: producer._id.toString(),
      });
    })
    .catch((err) => {
      console.log(err);
      res.send("Error Occurred !!! , Couldn't Add new producer");
    });
};

//Login Producer

export const loginProducer = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    //It is valid or not ?
    const producerExist = await Producer.findOne({ email });

    if (!producerExist) {
      return res.status(400).json({ msg: "Invalid Credentials !" });
    }

    const user = await producerExist.comparePassword(password);

    if (user) {
      return res.status(200).json({
        msg: "Login successfully!",
        token: await producerExist.generateToken(),
        userId: producerExist._id.toString(),
      });
    } else {
      return res.status(400).json({ msg: "Invalid Credentials !" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

//producer

export const producer = async (req, res) => {
  try {
    const producerData = req.user;
    return res.status(200).json({ producerData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};
