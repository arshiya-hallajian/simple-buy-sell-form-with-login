const router = require('express').Router();
const {Register, Login, Logout, Check} = require("../controllers/auth-controll");
const verify = require('../middlewares/verify-jwt');

// router.get('/auth', verify, Check);

router.post('/register', Register);

router.post('/login', Login);

router.get('/logout', verify, Logout);

module.exports = router;