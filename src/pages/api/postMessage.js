import { initMongoose } from "../../../config/mongoose";
import Message from "../../../models/Message";

export default async function handler(req, res){
    await initMongoose();
    if(req.method !== "POST")
        res.status(200).json({message: 'only POST methods allowed'})

    var msg = req.body;
    const message = await Message.create({
        message: msg.message,
        date: msg.date,
        peer: msg.peer,
        sender: msg.sender
    });

    res.status(200).json({message: 'message successfully posted'});
}