import Government from "../models/Government.js";
import Production from "../models/Production.js";
import governmentSchemaValidation from "../validation/governmentValidator.js";
import mongoose from "mongoose";

export const addGovernment = async (req, res) => {
  let government = await Government.findOne({ email: req.body.email });

  if (government) {
    return res
      .status(403)
      .json({ message: "government entity already exists" });
  }

  let { error } = governmentSchemaValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  government = new Government(req.body);

  government
    .save()
    .then(async () => {
      res.status(200).json({
        msg: "Registration successfully!",
        token: await government.generateToken(),
        userId: government._id.toString(),
      });
    })
    .catch((err) => {
      console.log(err);
      res.send("Error Occurred !!! , Couldn't Add new government entity");
    });
};

//Login Government

export const loginGovernment = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);

    //It is valid or not ?
    const govExist = await Government.findOne({ email });

    if (!govExist) {
      return res.status(400).json({ msg: "Invalid Credentials !" });
    }

    const user = await govExist.comparePassword(password);

    if (user) {
      return res.status(200).json({
        msg: "Login successfully!",
        token: await govExist.generateToken(),
        userId: govExist._id.toString(),
      });
    } else {
      return res.status(400).json({ msg: "Invalid Credentials !" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

//Government
export const government = async (req, res) => {
  try {
    const governmentData = req.user;
    return res.status(200).json({ governmentData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getAllGovernmentEntities = async(req, res) => {
    try {
        let data = await Government.find({});
        return res.status(200).json({ message: "success", governments : data});
    }
    catch(err) {
        return res.send("Error Occurred !!!");
    }
}
export const approveProduction = async (req, res) => {
  if (
    !mongoose.Types.ObjectId.isValid(req.params.govId) ||
    !mongoose.Types.ObjectId.isValid(req.params.proId)
  ) {
    return res.status(400).json({ error: `Invalid id` });
  }
  let government = await Government.findById(req.params.govId);
  if (!government) {
    return res
      .status(403)
      .json({ message: "government entity does not exist" });
  }
  let production = await Production.findById(req.params.proId);
  if (!production) {
    return res.status(403).json({ message: "production does not exist" });
  }

  if (
    !government.pendingProductions.includes(production._id) ||
    production.status !== "pending"
  ) {
    return res
      .status(403)
      .json({ message: "production is not present in pending productions" });
  }
  let idx = government.pendingProductions.indexOf(production._id);
  let arr = government.pendingProductions;
  let approved = arr[idx];
  government.pendingProductions = [...arr.slice(0, idx), ...arr.slice(idx + 1)];
  government.approvedProductions.push(approved);
  production.status = "approved";
  await production.save();
  await government.save();
  return res
    .status(200)
    .json({ message: "success", productions: government.pendingProductions });
};

export const rejectProduction = async (req, res) => {
  if (
    !mongoose.Types.ObjectId.isValid(req.params.govId) ||
    !mongoose.Types.ObjectId.isValid(req.params.proId)
  ) {
    return res.status(400).json({ error: `Invalid id` });
  }
  let government = await Government.findById(req.params.govId);
  if (!government) {
    return res
      .status(403)
      .json({ message: "government entity does not exist" });
  }
  let production = await Production.findById(req.params.proId);
  if (!production) {
    return res.status(403).json({ message: "production does not exist" });
  }

  if (
    !government.pendingProductions.includes(production._id) ||
    production.status !== "pending"
  ) {
    return res
      .status(403)
      .json({ message: "production is not present in pending productions" });
  }
  let idx = government.pendingProductions.indexOf(production._id);
  let arr = government.pendingProductions;
  government.pendingProductions = [...arr.slice(0, idx), ...arr.slice(idx + 1)];
  production.status = "rejected";
  await production.save();
  await government.save();
  return res
    .status(200)
    .json({ message: "success", productions: government.pendingProductions });
};
