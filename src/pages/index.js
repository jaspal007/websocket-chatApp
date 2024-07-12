// import { io } from "socket.io-client";
import Chat from "./chat";
import connection, { initMongoose } from "../../config/mongoose";
import Signup from "@/components/Signup";
import { useEffect } from "react";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Signup />
    </div>
  );
}

export async function getServerSideProps() {
  await initMongoose().then(() => console.log("connected"));
  return {
    props: {},
  };
}
