const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      // unique: true because multiple users can have apples
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
    tag : {
        type: String,
        required: false,
    },
    username : {
        type: String,
        required: true,
        trim: true,
    }

  },
  { collection: "items_list" }
);


const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;