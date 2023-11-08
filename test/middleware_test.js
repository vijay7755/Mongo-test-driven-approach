const assert = require('assert')
const mongoose = require('mongoose')
const User = require('../src/user')
const BlogPost = require('../src/blogPost')


describe('middleware', () => {
    let krishna, blogPost

    beforeEach((done) => {
        krishna = new User({name: 'krishna'})
        blogPost = new BlogPost({title: 'blog one', content: 'blog post content'})
        // comment = new Comment({content: 'blog comment message'})

        krishna.blogPosts.push(blogPost)
        // blogPost.comments.push(comment)
        // comment.user = krishna

        Promise.all([krishna.save(), blogPost.save()])
        .then(() => {
            // console.log("all promise---------")
            done()
        })
    })

    it('users cleanup dangling blogposts on delete', (done) => {
        krishna.deleteOne()
        .then(() => {
            return BlogPost.count()
        })
        .then((count) => {
            console.log("blogPost count: ", count)
            assert(count === 0)
            done()
        })
    })
})