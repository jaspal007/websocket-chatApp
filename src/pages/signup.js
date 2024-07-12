import { useEffect, useState } from "react";
import Input from "../components/Input";
import { useRouter } from "next/router";

export default function () {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cPass, setCpass] = useState("");
  const [valid, setValid] = useState(true);

  //methods
  useEffect(() => {
    checkUser(username);
  }, [username]);
  const checkUser = async (username) => {
    var userName = { username: username };
    let resp = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userName),
    });
    resp = await resp.json();
    if (resp["message"] !== "valid") {
      setValid(false);
      return;
    }
    setValid(true);
  };
  const createUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    var user = {
      email: formData.get("email"),
      name: formData.get("name"),
      username: formData.get("username"),
      password: formData.get("password"),
    };

    let response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    response = await response.json();
    console.log(response["message"]);
    router.push("/login");
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
            // checkUsername={checkUserName}
            signup={true}
            valid={valid}
            placeholder={"Be creative and unique!👨‍🎨"}
          />
          <Input
            label={"Create Password"}
            type={"password"}
            value={password}
            name={"password"}
            setValue={setPassword}
            placeholder={"Gotta keep it locked in...🤫"}
          />
          <Input
            label={"Re-enter Password"}
            type={"password"}
            value={cPass}
            name={"cpass"}
            setValue={setCpass}
            refValue={password}
            placeholder={"Better to be sure than sorry!🫡"}
          />
          <button
            className="text-2xl text-white font-bold p-5 rounded-xl shadow-2xl hover:drop-shadow-2xl bg-black/75 hover:bg-black focus:ring-black focus:ring-4 focus:ring-offset-2 disabled:bg-[#7e7e7e]/25 disabled:text-black/50"
            type="submit"
            disabled={name === "" ? true : false}
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}