const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

function connectWithRetry() {
  return mongoose.connect(
    "mongodb://localhost:27017",
    { useNewUrlParser: true },
    err => {
      if (err) {
        console.error(
          "Failed to connect to MongoDB on startup - retrying in 5 sec"
        );
        setTimeout(connectWithRetry, 5000);
      } else {
        console.log("Connected to MongoDB container");
      }
    }
  );
}

connectWithRetry();

const User = mongoose.model("User", {
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Init data
// new User({ username: "User", password: "pwd" }).save();

module.exports = User;
