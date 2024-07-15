import { useEffect, useState } from "react";
import { VscChevronDown } from "react-icons/vsc";
import moment from "moment-timezone";
import Msg from "./Msg";

export default function ({ messages, feedback, peer, sender, func, scroll }) {
  const msg = messages.length === 0 ? "" : messages[messages.length - 1];
  const [date, setDate] = useState("");
  useEffect(() => {
    const val = msg === "" ? "" : moment(msg.date).format("dddd, MMMM Do YYYY");
    if (date !== val) setDate(val);
  }, [messages]);
  return (
    <div className="h-full overflow-y-scroll scrollbar-hide" id="chat-content">
      <div className="pb-10">
        {/* <div className="italic text-center text-xl">{date}</div> */}
        {messages.map((packet, index) => (
          <Msg
            key={index}
            isOwn={peer._id == packet.peer}
            packet={packet}
            peer={peer}
            sender={sender}
          />
        ))}
        <p className="italic text-center" id="feedback">
          {feedback}
        </p>
      </div>
      {scroll ? (
        <div
          className="sticky w-fit left-1/2 text-xl bottom-5 bg-white drop-shadow-2xl rounded-full"
          onClick={(e) => {
            console.log("clicked");
            func();
          }}
          id="scoll"
        >
          <VscChevronDown className="size-12" />
        </div>
      ) : null}
    </div>
  );
}
