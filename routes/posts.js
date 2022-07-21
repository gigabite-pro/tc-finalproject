const router = require('express').Router();


router.get('/', (req, res) => {
    res.send('You have been logged in')
})

module.exports = router