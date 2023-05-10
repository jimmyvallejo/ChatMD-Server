const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: Number,
    pre_conditions: [],
    profile_image: {
      type: String,
      default: "../public/images/medicine.png",
    },
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
