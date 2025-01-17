import { initMongoose } from "../../../config/mongoose";
import User from "../../../models/User";
// import User from "../../../models/User";

export default async function handler(req, res) {
  console.log("executing...");
  await initMongoose();
  if (req.method !== "POST") {
    res.status(200).json({ message: "hello there" });
    return;
  }

  var user = req.body;
  const usr = await User.create({
    email: user["email"],
    name: user["name"],
    username: user["username"],
    password: user["password"],
  });
  res.status(200).json({ message: "User registered successfully..." });
}
