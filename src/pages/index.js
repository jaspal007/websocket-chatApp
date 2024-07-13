// import { io } from "socket.io-client";
import Chat from "./chat/[chat]";
import connection, { initMongoose } from "../../config/mongoose";
import { useEffect } from "react";

export default function Home() {
  return (
    <div className="w-full h-screen">
      Hello
    </div>
  );
}

export async function getServerSideProps() {
  await initMongoose().then(() => console.log("connected"));
  return {
    props: {},
  };
}
