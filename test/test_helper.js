const mongoose = require("mongoose");

mongoose.Promise = global.Promise


before((done) => {
  mongoose.connect("mongodb://localhost/users_test");
  mongoose.connection
    .once("open", () => {
      console.log("Good to go!");
      done();
    })
    .on("error", (err) => console.warn("Warning: ", err));
});


beforeEach((done) => {
  const {users, blogposts, comments} = mongoose.connection.collections

  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done()
      })
    })
  })
})
