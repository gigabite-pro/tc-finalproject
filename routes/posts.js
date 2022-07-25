const router = require('express').Router();
const {isAuthorized, isVerified} = require('../config/authCheck');
const Posts = require('../models/Posts');
const Users = require('../models/Users');


router.get('/', isAuthorized, isVerified, (req, res) => {
    Posts.find()
    .then(posts => {
        console.log(posts)
        res.render('posts', {posts: posts});
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

module.exports = router