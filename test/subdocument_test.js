const assert = require('assert')
const User = require('../src/user')


describe('Subdocuments', () => {

    it('can create a subdocument', (done) => {
        const krishna = new User({
            name: 'krishna',
            posts: [{title: 'post_1_title'}]
        })

        krishna.save()
        .then(() => User.findOne({name: 'krishna'}))
        .then((user) => {
            // console.log("user: ", user)
            assert(user.posts[0].title === 'post_1_title')
            done()
        })
    })

    it('add subcomponent to existing records', (done) => {
        const krish = new User({name: 'krish'})

        krish.save()
        .then(() => User.findOne({name: 'krish'}))
        .then((user) => {
            user.posts.push({title: 'new_post_2'})
            return user.save()
        })
        .then(() => User.findOne({name: 'krish'}))
        .then((user) => {
            // console.log("post 2 user: ", user)
            assert(user.posts[0].title === 'new_post_2')
            done()
        })
    })

    it('remove the subdocument', (done) => {
        const krishnan = new User({
            name: 'krishnan',
            posts: [{title: 'post_3'}]
        })

        krishnan.save()
        .then(() => User.findOne({name: 'krishnan'}))
        .then((user) => {
            // console.log("usr krishnan: ", user)
            const post = user.posts[0];
            user.posts.pull(post);
            return user.save();
          })
          .then(() => User.findOne({name: 'krishnan'}))
          .then((user) => {
            // console.log("post remove: ", user)
            assert(user.posts.length === 0)
            done()
          })
    })
})