const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: String
})

// const Post = model('posts', PostSchema)

module.exports = PostSchema