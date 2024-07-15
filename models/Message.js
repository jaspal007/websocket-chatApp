import User from "./User";

const { Schema, model, models } = require("mongoose");

const MessageSchema = Schema({
  message: String,
  date: Date,
  peer: {
    type: Schema.Types.ObjectId,
    ref: User.modelName,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: User.modelName,
  },
});

const Message = models?.Message || model("Message", MessageSchema);
export default Message;
