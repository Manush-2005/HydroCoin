import Government from "../models/Government.js"
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