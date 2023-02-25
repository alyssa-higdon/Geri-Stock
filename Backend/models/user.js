const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 8)
          throw new Error("Invalid password, must be at least 8 characters.");
      }
    },
    // id : {
    //   type : Number
    // }
  },
  { collection: "users_list" }
);


const User = mongoose.model("User", UserSchema);

module.exports = User;