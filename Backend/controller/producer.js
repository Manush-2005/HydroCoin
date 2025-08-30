import Producer from "../models/Producer.js";
import producerSchemaValidation from "../validation/producerValidator.js"

export const addProducer = async(req, res) => {
    let producer = await Producer.findOne({email : req.body.email});

    if(producer) {
        return res.status(403).json({"message":"Producer already exists"});
    }

    let { error } = producerSchemaValidation.validate(req.body);

    if(error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    
    producer = new Producer(req.body);

    producer.save().then(()=>{
        res.status(200).json({ message: "New Producer Added Successfully" , producer});
    }).catch((err)=>{
        console.log(err);
        res.send("Error Occurred !!! , Couldn't Add new producer");
    });
}