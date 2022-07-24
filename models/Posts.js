const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    file: {
        type: String,
    },
    caption: {
        type: String,
    },
    username : {
        type: String,
        default: 'chintu'
    },
    userpfp: {
        type: String
    },
    likes: {
        type: Number,
        default: 0,
    },
    date: {
        type: String,
        default: new Date,
    },
})

const Posts = mongoose.model('Posts', postSchema);

module.exports = Posts