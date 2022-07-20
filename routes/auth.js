const router = require('express').Router();
const axios = require('axios');
const urlParse = require('url-parse');
const qs = require('query-string');
require('dotenv').config()

const redirectUri = process.env.REDIRECT_URI

function getGoogleAuthURL(){
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
    const options = {
        redirect_uri : redirectUri,
        client_id : process.env.GOOGLE_CLIENT_ID,
        access_type : 'offline',
        response_type : 'code',
        scope : 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        prompt : 'consent'
    }

     return `${rootUrl}?${qs.stringify(options)}`
}



router.get('/login', (req,res)=>{
    res.redirect(getGoogleAuthURL())
})

router.get('/callback', (req, res)=>{
    const queryUrl = new urlParse(req.url)
    const code = qs.parse(queryUrl.query).code

})

router.get('/logout', (req,res)=>{
    res.send('Logout Page')
})

module.exports = router;