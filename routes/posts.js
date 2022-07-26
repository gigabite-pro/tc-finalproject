const router = require('express').Router();
const {isAuthorized, isVerified} = require('../config/authCheck');
const Posts = require('../models/Posts');
const Users = require('../models/Users');


router.get('/', isAuthorized, isVerified, (req, res) => {
    Posts.find()
    .then(posts => {
        Users.findOne({email: req.session.user.email})
        .then(user => {
            res.render('posts', {posts: posts, loggedInUser: user});
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err));
})

router.post('/newpost', isAuthorized, isVerified, (req,res)=>{
    const file = req.body.fileUrl
    const caption = req.body.caption

    const newPost = new Posts({
        file: file,
        caption: caption,
        username: req.session.user.username,
        userpfp: req.session.user.pfp,
    })

    newPost.save()
    .then(()=>{
        Users.findOne({email: req.session.user.email})
        .then(doc => {
            let posts = doc.posts
            posts.push(file)
            doc.markModified('posts')
            doc.save()
            .then(() => {
                res.redirect('/profile')
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('/like', isAuthorized, isVerified, (req,res) =>{
    const {id,sender,senderpfp,receiver} = req.query
    Posts.findById(id)
    .then(doc => {
        doc.likes++
        doc.save()
        .then(()=>{
            Users.findOne({username: receiver})
            .then(receiver => {
                notifs = receiver.notifs
                notifs.push([
                    sender,
                    senderpfp,
                    id
                ])
                receiver.markModified('notifs')
                receiver.save()
                .then(()=>{
                    Users.findOne({email: req.session.user.email})
                    .then(sender => {
                        likedPosts = sender.likedPosts
                        likedPosts.push(id)
                        sender.markModified('likedPosts')
                        sender.save()
                        .then(()=>{
                            res.json({
                                data: true
                            })
                        })
                        .catch(err => 
                            res.json({
                                data: false
                            })
                                )
                    })
                    .catch(err => 
                        res.json({
                            data: false
                        })
                            )
                })
                .catch(err =>
                     res.json({
                        data: false
                        })
                          )
            }).catch(err => 
                res.json({
                    data: false
                })
                    )
        })
        .catch(err => 
            res.json({
                data: false
            })
            )
    })
    .catch(err => 
        res.json({
            data: false
        })
        )

})

module.exports = router