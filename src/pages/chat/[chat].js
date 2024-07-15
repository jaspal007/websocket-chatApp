import IChat from "@/components/iChat";
import ChatView from "../../components/chats/ChatView";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/router";

export default function () {
  const [peer, setPeer] = useState();
  const socket = io();
  const [sender, setSender] = useState();
  const [loading, setLoading] = useState(true);
  const [skt, setSkt] = useState("");
  const [feedback, setFeedback] = useState("");
  const router = useRouter();
  const id = router.query.chat;
  const peers = id === undefined ? [] : id.split(",");
  useEffect(() => {
    socket.on("socketID", (data) => {
      setSkt(data);
      console.log(`socketID: ${data}`);
    });
    socket.on("connectReq", (data) => {
      console.log(`connected to: ${data.username}`);
      // if (data.username === peers[0]) setPeer(data.socketID);
    });
    socket.emit("register", { username: peers[1] });
    let intervalID;
    if (peers.length > 1) intervalID = setInterval(connect, 2000);
    socket.on("feedback", (data) => {
      console.log(`feedback: ${peers[0]}`);
      console.log(`sender: ${data.sender}`);
      if (data.sender === peers[0]) {
        setFeedback(data.feedback);
      }
    });
    const result = JSON.parse(localStorage.getItem("users"));
    const setPeers = () => {
      setPeer(result.find((usr) => usr.username === peers[0]));
      setSender(result.find((usr) => usr.username === peers[1]));
      setLoading(false);
    };
    setPeers();

    return () => {
      clearInterval(intervalID);
      socket.off("socketID");
      socket.off("connectReq");
      socket.off("register");
      socket.off("feedback");
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

  //modifications
  function clearFeedback() {
    const messageInput = document.getElementById("message-input");
    messageInput.addEventListener("focus", (e) => {
      socket.emit("feedback", {
        feedback: `typing...`,
        peer: peers[0],
        sender: peers[1],
      });
    });
    messageInput.addEventListener("keypress", (e) => {
      socket.emit("feedback", {
        feedback: `typing...`,
        peer: peers[0],
        sender: peers[1],
      });
    });
    messageInput.addEventListener("blur", (e) => {
      socket.emit("feedback", {
        feedback: "",
        peer: peers[0],
        sender: peers[1],
      });
    });
  }

  return (
    <div className="">
      <IChat />
      {loading ? (
        <div>LOADING...</div>
      ) : (
        <ChatView
          val={peers}
          peer={peer}
          sender={sender}
          clearFeedback={clearFeedback}
          feedback={feedback}
        />
      )}
    </div>
  );
}

//so that the id data doesn't disappear on reload
export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
