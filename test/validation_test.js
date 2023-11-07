const assert = require('assert')
const User = require('../src/user')


describe('validating records', () => {


    it('requires a user name', () => {
        const user = new User({name: undefined})
        const validationResult = user.validateSync()
        
        const {message} = validationResult.errors.name
        assert(message === 'Name is required')
    })

    it('requires a user\'s name longer than 2 characters', () => {
        const user = new User({name: 'Kr'})
        const validationResult = user.validateSync()

        const {message} = validationResult.errors.name
        // console.log('2 char message: ', message)
        assert(message === 'Name must be longer than two characters')
    })

    it('disallows invalid record from being saved', (done) => {
        const user = new User({name: 'kr'})
        user.save()
        .catch((validationResult) => {
            const {message} = validationResult.errors.name
            assert(message === 'Name must be longer than two characters')
            done()
        })
    })
})