const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.header('auth')) {
        const token = JSON.parse(req.header('auth'));


// console.log(token.token);
        if (!token.token) {
            return res.status(401).send('access Denied');
        }
        try {
            const verified = jwt.verify(token.token, process.env.SECRET_TOKEN);
            req.data = verified;
            console.log(req.data);
            next();
        } catch (e) {
            res.status(400).send('Wrong Token');
        }
    }else{
        res.status(401).send('token not exists');
    }
}