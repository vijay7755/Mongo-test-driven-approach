const assert = require('assert');
const User = require('./../src/user')

describe('create records', () => {
    it('saves a user', (done) => {
        // assert((1+1) === 3)
        const krishna = new User({name: 'Krishna'})

        krishna.save()
        .then(() => {
            assert(!krishna.isNew)
            done()
        })
    })
})