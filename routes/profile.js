const router = require('express').Router();
const {isAuthorized, isVerified} = require('../config/authCheck');
const Users = require('../models/Users');
const Posts = require('../models/Posts');

router.get('/', isAuthorized, isVerified, (req,res)=>{
    Users.findOne({email: req.session.user.email})
    .then(doc => {
        res.render('profile', {user: doc});
    })
    .catch(err => console.log(err));
})

module.exports = router