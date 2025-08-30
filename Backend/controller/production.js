import Government from "../models/Government.js";
import Producer from "../models/Producer.js";
import Production from "../models/Production.js";
import productionValidationSchema from "../validation/productionValidator.js";

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