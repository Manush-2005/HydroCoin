import Government from "../models/Government.js"
import Production from "../models/Production.js";
import governmentSchemaValidation from "../validation/governmentValidator.js"

export const addGovernment = async(req, res) => {
    let government = await Government.findOne({email : req.body.email});

    if(government) {
        return res.status(403).json({"message":"government entity already exists"});
    }

    let { error } = governmentSchemaValidation.validate(req.body);

    if(error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    
    government = new Government(req.body);

    government.save().then(()=>{
        res.status(200).json({ message: "New government Added Successfully" , government});
    }).catch((err)=>{
        console.log(err);
        res.send("Error Occurred !!! , Couldn't Add new government entity");
    });
}

export const approveProduction = async(req, res) => {
    let government = await Government.findById(req.params.govId);
    if(!government) {
        return res.status(403).json({"message":"government entity does not exist"});
    }
    let production = await Production.findById(req.params.proId);
    if(!production) {
        return res.status(403).json({"message":"production does not exist"});
    }

    if(!government.pendingProductions.includes(production._id) || production.status !== 'pending') {
        return res.status(403).json({"message":"production is not present in pending productions"});
    }
    let idx = government.pendingProductions.indexOf(production._id);
    let arr = government.pendingProductions;
    let approved = arr[idx];
    government.pendingProductions = [...arr.slice(0, idx), ...arr.slice(idx + 1)];
    government.approvedProductions.push(approved);
    production.status = "approved";
    await production.save();
    await government.save();
    return res.status(200).json({ message: "success", productions : government.pendingProductions});
}

