const {valorantValidation} = require('./validation');
const Valorant = require('../model/Valorant');


module.exports.seller = async (req, res) => {
    //validate valorant form
    const {error} = valorantValidation(await req.body);
    // console.log(req.body);
    if (error) {
        console.log("validation error");
        return res.status(400).send(error.details[0].message);
    }

    const images_patch = [];
    if (req.body.photos_number) {
        for (let i = 0; i < req.body.photos_number; i++) {
            images_patch.push(req.files[i].path);
        }
    }


    //create valorant post
    const valorant = new Valorant({
        region: req.body.region,
        rank: req.body.rank,
        level: req.body.level,
        account_name: req.body.account_name,
        valorant_point: req.body.valorant_point,
        radient_point: req.body.radiant_point,
        email_status: req.body.m_mail,
        email: req.body.m_email,
        agents: req.body.agents,
        skins: req.body.skins,
        description: req.body.desc,
        photos_number: req.body.photos_number,
        images: images_patch,
    });

    try {
        const saved_user = await valorant.save();
        res.send("post saved");

    } catch (err) {
        res.status(400).send(err);
        console.log("data insert error");
    }
}
