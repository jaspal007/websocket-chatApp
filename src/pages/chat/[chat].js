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
    let intervalID;
    if (peers.length > 1) intervalID = setInterval(connect, 2000);

    return () => {
      clearInterval(intervalID);
      socket.off("socketID");
      socket.off("connectReq");
      socket.off("register");
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
