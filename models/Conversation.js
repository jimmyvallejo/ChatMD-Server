const { Schema, model } = require("mongoose");

const conversationSchema = new Schema(
  {
   owner: String,
   discussion: {
     title: String,
     dialogue: [Object]
   }

  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const Conversation = model("Conversation", conversationSchema);
module.exports = Conversation;
