import { initMongoose } from "../../../config/mongoose";
import Message from "../../../models/Message";

export default async function handler(req, res){
    await initMongoose();
    if(req.method !== "POST")
        res.status(200).json({message: 'only POST methods allowed'})

    var cred = req.body;
    console.log(cred.peer);
    var sender = cred.sender;
    var peer = cred.peer;
    console.log(`peer: ${peer}`)
    console.log(`sender: ${sender}`)
    let messages  = await Message.find({peer, sender});
    res.json(messages);
}