import { useState } from "react";
import Input from "./Input";

export default function () {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [cPass, setCpass] = useState("");

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="m-5 text-7xl font-extrabold">Sign Up</h1>
      <div className="flex flex-col h-fit w-3/4 text-center justify-center rounded-2xl shadow-[0px_12px_50px_-12px_rgba(0,0,0,0.5)] bg-[#ebebeb]/50">
        <form className="m-5">
          <Input
            label={"Email"}
            type={"email"}
            value={email}
            setValue={setEmail}
            placeholder={"as per my last email...🤓"}
          />
          <Input
            label={"Name"}
            type={"text"}
            value={name}
            setValue={setName}
            placeholder={"Hey! you are...?🥷"}
          />
          <Input
            label={"Username"}
            type={"text"}
            value={username}
            setValue={setUsername}
            placeholder={"Be creative and unique!👨‍🎨"}
          />
          <Input
            label={"Create Password"}
            type={"password"}
            value={pass}
            setValue={setPass}
            placeholder={"Gotta keep it locked in...🤫"}
          />
          <Input
            label={"Re-enter Password"}
            type={"password"}
            value={cPass}
            setValue={setCpass}
            placeholder={"Better to be sure than sorry!🫡"}
          />
          <button className="text-2xl text-white font-bold bg-[#7e7e7e] p-5 rounded-xl shadow-2xl hover:drop-shadow-2xl hover:bg-[#3a3a3a]">
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
