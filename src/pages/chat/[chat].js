import IChat from "@/components/iChat";
import ChatView from "../../components/chats/ChatView";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/router";

export default function () {
  const [peer, setPeer] = useState();
  const [skt, setSkt] = useState("");
  const router = useRouter();
  const id = router.query.chat;
  const peers = id === undefined ? [] : id.split(",");
  const socket = io();
  useEffect(() => {
    socket.on("socketID", (data) => {
      setSkt(data);
      console.log(data);
    });
    socket.on("connectReq", (data) => {
      console.log(`connected to: ${data.username}`);
      if (data.username === peers[0]) setPeer(data.socketID);
    });
    socket.emit("register", { username: peers[1] });
    if (peers.length > 1) setInterval(connect, 2000);

    return () => {
      socket.close();
    };
  }, []);

  function connect() {
    console.log("tum chala...");
    const connectReq = {
      socketID: skt,
      username: peers[1],
      peerUsername: peers[0],
    };
    socket.emit("connectReq", connectReq);
  }

  return (
    <div className="">
      <IChat />
      <div onClick={connect}>connect</div>
      <ChatView socket={socket} val={peers} />
    </div>
  );
}

//so that the id data doesn't disappear on reload
export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
