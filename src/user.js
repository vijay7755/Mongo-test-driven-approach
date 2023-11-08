const mongoose = require("mongoose")
const PostSchema = require("./post")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than two characters' 
        },
        required: [true, 'Name is required']
    },
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }],
    posts: [PostSchema]
})

UserSchema.virtual('postCount').get(function () {
    return this.posts.length
})

// middleware (pre & post methods)
UserSchema.pre('deleteOne', {document: true}, function(next) {
    const BlogPost = mongoose.model('blogPost') // instead of import from the top, we use mongoose model to load/import blogPosts model
    // this === 'krishna'

    BlogPost.deleteMany({_id: {$in: this.blogPosts} })
    .then(() => next()) // to accomodate the asynchronous nature we use the concept called next
    // NEXT will tell mongoose to move on to next middleware once all the statements executed in the current middleware
})



const User = mongoose.model('user', UserSchema)

module.exports = User