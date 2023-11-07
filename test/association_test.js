const assert = require('assert')
const BlogPost = require("../src/blogPost")
const Comment = require("../src/comment")
const User = require("../src/user")


describe('association tests', () => {
    let krishna, blogPost, comment

    beforeEach((done) => {
        krishna = new User({name: 'krishna'})
        blogPost = new BlogPost({title: 'blog one', content: 'blog post content'})
        comment = new Comment({content: 'blog comment message'})

        krishna.blogPosts.push(blogPost)
        blogPost.comments.push(comment)
        comment.user = krishna

        Promise.all([krishna.save(), blogPost.save(), comment.save()])
        .then(() => {
            console.log("all promise---------")
            done()
        })
    })

    it('saves a relationship between user and a blogpost', (done) => {
        User.findOne({name: 'krishna'})
        .populate('blogPosts')
        .then((user) => {
            console.log("relation user: ", user.blogPosts[0])
            assert(user.blogPosts[0].title === 'blog one')
            done()
        })
    })

    it('saves a full relation graph', (done) => {
        User.findOne({name: 'krishna'})
        .populate({
            path: 'blogPosts',
            // model: 'blogPost',
            populate: {
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'user',
                    model: 'user'
                }
            }
        }).then(user => {
            console.log("populate full relation: ", user.blogPosts[0].comments[0])
            assert(user.name === 'krishna')
            assert(user.blogPosts[0].title === 'blog one')
            assert(user.blogPosts[0].comments[0].content === 'blog comment message')
            assert(user.blogPosts[0].comments[0].user.name === 'krishna')
            done()
        })
    })
})



