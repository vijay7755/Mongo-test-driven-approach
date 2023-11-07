const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  let krishna;

  beforeEach((done) => {
    krishna = new User({ name: "Vasudev Krishna" });
    krishna.save().then(() => {
      done();
    });
  });

  it("finds all the users with the name joe", () => {
    User.find({ name: "Vasudev Krishna" }).then((users) => {
    //   console.log("users: ", users);
    //   console.log("users[0]._id: ", users[0]._id.toString());
    //   console.log("krishna._id: ", krishna._id.toString());
      assert(users[0]._id.toString() === krishna._id.toString());
    });
  });

  it('find a user with a particular ID', (done) => {
    User.findOne({_id: krishna._id}).then((user) => {
        assert(user.name === 'Vasudev Krishna')
        done()
    })
  })
});
