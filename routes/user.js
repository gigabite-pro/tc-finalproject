const router = require('express').Router();

router.get('/profile', (req,res)=>{
    res.send('Profile Page')
})

module.exports = router;