import { initMongoose } from "../../../config/mongoose";
import User from "../../../models/User";

export default async function handler(req, res) {
  console.log("executing...");
  await initMongoose();
  if (req.method !== "POST") {
    res.status(200).json({ message: "only POST methods are allowed" });
    return;
  }

  var user = req.body;
  var username = user["username"];
  var usr = {
    username: user["username"],
    password: user["password"],
  };
  let resp = await User.findOne({ username });
  if (!resp) {
    res.status(200).json({ message: "user not registered!" });
    return;
  }

  const isMatch = await resp.comparePassword(usr["password"]);
  if (isMatch === false)
    res.status(200).json({ message: "incorrect password!" });

  res
    .status(200)
    .json({ status: "ok", message: "user logged in successfully" });
}
