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
      default:
        "https://media.istockphoto.com/id/1028847418/vector/doctor-visit-with-patient-for-medicine-concept.jpg?s=612x612&w=0&k=20&c=0w5u7ShrukF7Jk_IgqBDRhW-3MfOJzuRurkIgSF9Wow=",
    },
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
