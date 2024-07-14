import { initMongoose } from "../../../config/mongoose";
import User from "../../../models/User";

export default async function handler(req, res) {
  await initMongoose();
  let response = await User.find().exec();
  //   response = response.json();
  console.log(typeof response);
  res.json(response);
}
