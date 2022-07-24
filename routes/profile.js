const router = require('express').Router();
const {isAuthorized, isVerified} = require('../config/authCheck');

router.get('/', isAuthorized, isVerified, (req,res)=>{
    res.render('profile')
})

module.exports = router