const { Schema, model, models } = require("mongoose");

const MessageSchema = Schema({
    message: String,
    date: Date,
    peer: String,
    sender: String,
});

const Message = models?.Message || model('Message', MessageSchema);
export default Message;