import { initMongoose } from "../../../config/mongoose";
import User from "../../../models/User";

export default async function handler(req, res) {
  console.log("executing...");
  await initMongoose();
  if (req.method !== "POST") {
    res.status(200).json({ message: "hello there" });
    return;
  }

  var usr = req.body;
  var username = usr["username"];
  let resp = await User.findOne({ username });
  if (!resp) res.status(200).json({ message: 'valid' });
  res.status(200).json({ message: 'invalid' });
}
