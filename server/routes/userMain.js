const router = require('express').Router();
const {seller} = require("../controllers/sellers");
const {buyer} = require("../controllers/buyers");
const verify = require('../middlewares/verify-jwt');
const upload = require('../middlewares/multiupload');



router.get('/buy-list',verify, buyer);

router.post('/sell-form',verify ,upload.array('valorantImg', 20), seller);


module.exports = router;