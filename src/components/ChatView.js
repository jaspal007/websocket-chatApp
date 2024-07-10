import { CiUser } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { useState } from "react";
import moment from "moment";
import ChatContent from "./ChatContent";
// import { useEffect } from "react";
// import io from "socket.io-client";
let socket;

export default function () {
  const [name, setName] = useState("anonymous");
  const [message, setMessage] = useState("enter message....");
  const [date, setDate] = useState(moment(Date.now()).fromNow());
  const [packet, setPacket] = useState({
    name: name,
    message: message,
    date: date,
  });

  return (
    <div className="flex justify-center">
      <div className="flex flex-col border-[#dddddd] border-solid border-8 rounded-2xl w-3/4 h-[700px]">
        <div className="flex justify-between w-full h-16 bg-[#ebebeb] p-2 rounded-b-xl rounded-t-lg">
          <CiUser className="size-12 text-[#7e7e7e]" />
          <input
            className="ps-2 grow text-3xl font-bold outline-none border-none rounded-xl text-[#7e7e7e] bg-[#ebebeb]"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <ChatContent packet={packet} />
        <div className="flex justify-between w-full h-20 bg-[#ebebeb] rounded-t-2xl rounded-b-lg p-2">
          <textarea
            className="text-3xl grow text-[#7e7e7e] border-none outline-none bg-[#ebebeb] break-words h-16 scrollbar-hide"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="w-1 bg-[#dddddd] rounded-xl"></div>
          <button
            className="flex justify-center content-center items-center text-[#7e7e7e]"
            onSubmit={(e) => {
              setPacket({
                name: name,
                message: message,
                date: date,
              });
              socket.emit('message-sent', packet);
            }}
          >
            <IoIosSend className="text-2xl" />
            <p className="text-2xl">send</p>
          </button>
        </div>
      </div>
    </div>
  );
}
