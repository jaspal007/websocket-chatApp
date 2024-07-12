import { initMongoose } from "../../../config/mongoose";
// import User from "../../../models/User";

export default async function handler(req, res) {
    console.log();
  await initMongoose();
  if (req.method !== "POST") {
    res.status(200).json({message: 'hello there'});
    return;
  }
//   console.log(`request: ${req.body}`);
//   const user = await User.create({
//     email: formData.get("email"),
//     name: formData.get("name"),
//     username: formData.get("username"),
//     password: formData.get("pass"),
//   });

//   console.log(user);
res.status(200).json({message: 'request completed'});
}
