import IChat from "@/components/iChat";
import ChatView from "../components/ChatView";
import { useEffect } from "react";
import { Socket } from "@/components/socket";
import { io } from "socket.io-client";

export default function () {
  const socket = io();
  useEffect(() => {
    socket.on("total-clients", (data) => {
      console.log(data);
      document.getElementById("clients").innerText = `Total Clients: ${data}`;
    });
  }, []);
  return (
    <div className="">
      <IChat />
      <ChatView socket={socket} />
      <h3
        className="text-4xl font-bold justify-center flex text-[#7e7e7e] my-5"
        id="clients"
      >
        {"Total clients: " + 0}
      </h3>
    </div>
  );
}
