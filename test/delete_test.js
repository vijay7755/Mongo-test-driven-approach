const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let krishna;

  beforeEach((done) => {
    krishna = new User({ name: "Sri Krishna" });
    krishna.save().then(() => {
      done();
    });
  });

  it("model instance remove", (done) => {
    krishna
    .deleteOne()
    .then(() => User.findOne({ name: 'Sri Krishna' }))
    .then((user) => {
      assert(user === null);
      done();
    });
  });
  

  it("class method remove", () => {
    User.findOneAndDelete({name: 'Sri Krishna'})
    .then(() => User.findOne({name: 'Sri Krishna'}))
    .then(users => {
      assert(users === null)
    })
  });


  it("class method findAndRemove", () => {
    User.findByIdAndDelete()
  });


  it("class method findByIdAndRemove", () => {
    User.findByIdAndRemove({})
  });
});
