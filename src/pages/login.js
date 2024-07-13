import Input from "@/components/Input";
import { useRouter } from "next/router";
import { useState } from "react";
import Slug from "./user/[...user]";

export default function () {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const loginUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    var user = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    let response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    response = await response.json();
    console.log(response["message"]);
    setMessage(response["message"]);
    if (response["status"] === "ok") router.push(`/user/${[user.username]}`);
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="m-5 text-7xl font-extrabold">Login</h1>
      <div className="flex flex-col h-fit w-3/4 text-center justify-center rounded-2xl shadow-[0px_12px_50px_-12px_rgba(0,0,0,0.5)] bg-[#ebebeb]/50">
        <form className="m-5" onSubmit={loginUser}>
          <Input
            label={"Username"}
            type={"text"}
            value={username}
            name={"username"}
            setValue={setUsername}
            placeholder={"hello friend...👋"}
          />
          <Input
            label={"Password"}
            type={"password"}
            value={password}
            name={"password"}
            setValue={setPassword}
            placeholder={"magic words...✨"}
          />
          <h2 className="mb-5 text-4xl text-[#3a3a3a]">{message}</h2>
          <button
            className="text-2xl text-white font-bold p-5 rounded-xl shadow-2xl hover:drop-shadow-2xl bg-black/75 hover:bg-black focus:ring-black focus:ring-4 focus:ring-offset-2 disabled:bg-[#7e7e7e]/25 disabled:text-black/50"
            type="submit"
            disabled={username === "" || password === "" ? true : false}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
