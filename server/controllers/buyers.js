const Valorant = require('../model/Valorant');


module.exports.buyer = async (req, res) => {
    try{
        const data = await Valorant.find();
        res.status(200).send(data);
    }catch (err){
        res.status(400).send(err);
        console.log("database get error")
    }
}