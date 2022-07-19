const router = require('express').Router();

router.get('/', (req,res)=>{
    res.send('Auth Route')
})

router.get('/login', (req,res)=>{
    res.send('Login Page')
})

router.get('/logout', (req,res)=>{
    res.send('Logout Page')
})

module.exports = router;