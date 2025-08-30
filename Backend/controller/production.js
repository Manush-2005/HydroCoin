import Government from "../models/Government.js";
import Producer from "../models/Producer.js";
import Production from "../models/Production.js";
import productionValidationSchema from "../validation/productionValidator.js";
import mongoose from "mongoose";

export const addProduction = async(req, res) => {
    let { error } = productionValidationSchema.validate(req.body);
    if(error) return res.status(400).json({ message: error.details[0].message });

    let producer = await Producer.findOne({walletId : req.body.producer_wallet_id});
    if(!producer) return res.status(400).json({ message: "Producer does not exist"});

    let receiver = await Government.findOne({walletId : req.body.receiver_wallet_id});
    if(!receiver) return res.status(400).json({ message: "Receiver does not exist"});

    let production = new Production(req.body);
    await production.save();
    receiver.pendingProductions.push(production._id);
    await receiver.save().then(()=>{

        res.status(200).json({ message: "New production Added Successfully" , production});
    }).catch((err)=>{
        console.log(err);
        res.send("Error Occurred !!! , Couldn't Add new production");
    });
}

export const getAllProductionsOfGovernment = async(req, res) => {
    let {id} = req.params; 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `Invalid id` });
    }
    let gov = await Government.findById(id);

    if(!gov) {
        return res.status(400).json({ message: "Id does not exist"});
    }

    gov = await gov.populate('pendingProductions');
    return res.status(200).json({productions: gov.pendingProductions});
}

export const getAllApprovedProductionsOfGovernment = async(req, res) => {
    let {id} = req.params; 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `Invalid id` });
    }
    let gov = await Government.findById(id);

    if(!gov) {
        return res.status(400).json({ message: "Id does not exist"});
    }

    gov = await gov.populate('approvedProductions');
    return res.status(200).json({productions: gov.approvedProductions});
}
