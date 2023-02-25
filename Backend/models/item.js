const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      required: true,
      trim: true,
    },
    tags : {
        type: List[String],
        required: false,
    },
    userID : {
        type: Number
    }

  },
  { collection: "items_list" }
);


const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;