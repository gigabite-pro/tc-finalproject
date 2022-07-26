const router = require('express').Router()
const Users = require('../models/Users')
const Posts = require('../models/Posts')
const {isAuthorized, isVerified} = require('../config/authCheck')

router.get('/', isAuthorized, isVerified,  (req,res)=>{
    Users.findOne({email: req.session.user.email})
    .then(doc => {
        let notifs = doc.notifs
        let posts = []
        if(notifs.length > 0){
            notifs.forEach(notif => {
                Posts.findById(notif[2])
                .then(post => {
                    posts.push(post.file)
                    if(posts.length == notifs.length){
                        res.render('notifs', {notifs,posts})
                    }
                }).catch(err => console.log(err))
            }
            )
        }else{
            res.render('notifs', {notifs,posts})
        }
        
    })
    .catch(err => console.log(err))
})

module.exports = router