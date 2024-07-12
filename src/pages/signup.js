import { useState } from "react";
import Input from "../components/Input";
import User from "../../models/User";
import { initMongoose } from "../../config/mongoose";
// import handler from "@/pages/api/signup";

export default function () {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [cPass, setCpass] = useState("");

  //methods
  const createUser = async (event) => {
    await initMongoose();

    event.preventDefault();
    const formData = new FormData(event.target);
    var user = {
      email: formData.get('email'),
      name: formData.get('name'),
      username: formData.get('usernamel'),
      password: formData.get('pass'),
    };


    let response = await fetch('./api/signup',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(JSON.parse(user)),
    });
    response = await response.json();
    console.log(response.status);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="m-5 text-7xl font-extrabold">Sign Up</h1>
      <div className="flex flex-col h-fit w-3/4 text-center justify-center rounded-2xl shadow-[0px_12px_50px_-12px_rgba(0,0,0,0.5)] bg-[#ebebeb]/50">
        <form className="m-5" onSubmit={createUser}>
          <Input
            label={"Email"}
            type={"email"}
            value={email}
            name={"email"}
            setValue={setEmail}
            placeholder={"as per my last email...🤓"}
          />
          <Input
            label={"Name"}
            type={"text"}
            value={name}
            name={"name"}
            setValue={setName}
            placeholder={"Hey! you are...?🥷"}
          />
          <Input
            label={"Username"}
            type={"text"}
            value={username}
            name={"username"}
            setValue={setUsername}
            placeholder={"Be creative and unique!👨‍🎨"}
          />
          <Input
            label={"Create Password"}
            type={"password"}
            value={pass}
            name={"pass"}
            setValue={setPass}
            placeholder={"Gotta keep it locked in...🤫"}
          />
          <Input
            label={"Re-enter Password"}
            type={"password"}
            value={cPass}
            name={"cpass"}
            setValue={setCpass}
            placeholder={"Better to be sure than sorry!🫡"}
          />
          <button
            className="text-2xl text-white font-bold bg-[#7e7e7e] p-5 rounded-xl shadow-2xl hover:drop-shadow-2xl hover:bg-[#3a3a3a]"
            type="submit"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
