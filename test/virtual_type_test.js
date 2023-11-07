const assert = require('assert')
const User = require('../src/user')


describe('virtual types', () => {

    it('postCount returns number of posts', (done) => {
        const krishna = new User({
            name: 'krishna',
            posts: [{title: 'post_new'}]
        })

        krishna.save()
        .then(() => User.findOne({name: 'krishna'}))
        .then((user) => {
            // console.log("postcount: ", user)
            assert(user.postCount === 1)
            done()
        })
    })
})