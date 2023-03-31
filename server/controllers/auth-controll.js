const {registerValidation, loginValidation} = require("./validation");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports.Register = async (req, res) => {
    //validate data before user
    const { error } = registerValidation(req.body);
    if (error) {
        console.log("validation error");
        return res.status(400).send(error.details[0].message);
    }

    //check email in database
    const email_check = await User.findOne({ email: req.body.email});
    if (email_check) {
        console.log("user check error");
        return res.status(400).send('شما قبلا ثبت نام کرده اید');
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(req.body.password, salt);

    //create user
    const user = new User ({
        // name: req.body.name,
        email: req.body.email,
        password: hashed_password
    });

    try {
        const saved_user = await user.save();
        res.send({ user: user._id});

    }catch (err){
        res.status(400).send(err);
        console.log("data insert error");
    }
}



module.exports.Login = async (req, res) => {

    const {error} = loginValidation(req.body);
    if (error) {
        console.log("validation error");
        return res.status(400).send(error.details[0].message);
    }


    //check email in database
    const user_check = await User.findOne({ email: req.body.email});
    if (!user_check) {
        console.log("user check error");
        return res.status(400).send('شما ثبت نام نکرده اید');
    }

    const validate_password = await bcrypt.compare(req.body.password, user_check.password);
    if (!validate_password) {
        console.log("password wrong");
        return res.status(400).send('رمز وارد شده اشتباه است');
    }

    const token = jwt.sign({_id: user_check._id,test:"hey"}, process.env.SECRET_TOKEN);

    res.header('auth', token).send({token: token});
    // res.send('logged in!');
}

module.exports.Logout = async (req, res) => {

    res.status(200).send("ok")
}

module.exports.Check = async (req, res) => {
    const data = {
        status:true,
        data: req.data
    }
    console.log(data);
    res.status(200).send(data);
}