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
    // socket.on("total-clients", (data) => {
    //   console.log('chala...')
    //   document.getElementById("clients").innerText = `Total Clients: ${data.clients}`;
    // });
    socket.on("socketID", (data) => {
      setSkt(data);
      console.log(data);
    });
    socket.on("connectReq", (data) => {
      console.log(data);
      if(data.username == peers[0]){
        console.log(data.socketID)
        setPeer((data['socketID']))
      }else{
        console.log('naa mila');
      }
      // console.log(`${peers[1]}, ${peers[0]} ko dhundh raha h`);
      // console.log("ab tum");
      // console.log( data.username);
      // console.log( peers[0]);
      // if (data.username == peer[0]) {
      //   setPeer(data.socketID);
      //   console.log(`connected to: ${data.username}`);
      // } else {
      //   console.log(`naa mila`);
      // }
    });
    // connect();
    return () => {
      // socket.off('total-clients');
      // socket.off('socketID');
      // socket.off('connectReq');
      socket.close();
    };
  }, []);

  function connect() {
    console.log("tum chala...");
    const connectReq = {
      socketID: skt,
      username: peers[1],
    };
    console.log(`skt: ${skt}`);
    console.log(`peer: ${peer}`);
    // if(peer!=undefined) process.env.PEER = peer;
    // console.log(`env PEER: ${process.env.PEER}`);
    socket.emit("connectReq", connectReq);
  }

  return (
    <div className="">
      <IChat />
      <div onClick={connect}>connect</div>
      <ChatView socket={socket} val={peers[0]} peer={peer}/>
      {/* <h3
        className="text-4xl font-bold justify-center flex text-[#7e7e7e] my-5"
        id="clients"
      >
        {"Total clients: " + 0}
      </h3> */}
    </div>
  );
}

//so that the id data doesn't disappear on reload
export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
