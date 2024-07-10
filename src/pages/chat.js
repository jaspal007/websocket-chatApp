import IChat from "@/components/iChat";
import ChatView from "../components/ChatView";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function () {
  const [clients, setClients] = useState(0);
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
      <ChatView />
      <h3
        className="text-4xl font-bold justify-center flex text-[#7e7e7e] my-5"
        id="clients"
      >
        {"Total clients: " + clients}
      </h3>
    </div>
  );
}
