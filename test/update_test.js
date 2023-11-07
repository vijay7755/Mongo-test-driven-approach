const assert = require("assert");
const User = require("../src/user");


describe('update user', () => {
    let krishna;

    beforeEach((done) => {
        krishna = new User({name: 'sri krishna', likes: 0})
        krishna.save()
        .then(() => {
            done()
        })
    })

    function assertName(operation, done) {
        operation
        .then(() => User.find({}))
        .then((users) => {
            assert(users.length === 1)
            assert(users[0].name === 'ram')
            done()
        })
    }

    it('A model instnce can update', (done) => {
        assertName(krishna.updateOne({name: 'ram'}), done)
    })


    it('A model class can update', (done) => {
        assertName(User.updateMany({ name: 'sri krishna' }, { name: 'ram' }), done);
      });

    it('User postCount increment by 1', (done) => {
        User.updateOne({name: 'sri krishna'}, {$inc: {likes: 1}})
        .then(() => User.findOne({name: 'sri krishna'}))
        .then((user) => {
            assert(user.likes === 1)
            done()
        })
    })
})