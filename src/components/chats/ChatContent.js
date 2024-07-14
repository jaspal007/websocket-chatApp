import { useEffect, useState } from "react";
import moment from "moment-timezone";
import Msg from "./Msg";

export default function ({ messages, feedback, peer }) {
  const msg = messages.length === 0 ? '' : messages[messages.length - 1];
  // console.log(messages);
  const [date, setDate] = useState("");
  useEffect(() => {
    const val =
      msg === ''
        ? ""
        : moment(msg.date).format("dddd, MMMM Do YYYY");
    if (date !== val) setDate(val);
  }, [messages]);
  return (
      <div
        className="h-full overflow-y-scroll scrollbar-hide pb-10"
        id="chat-content"
        >
        {/* <div className="italic text-center text-xl">{date}</div> */}
        {messages.map((packet, index) => (
          <Msg key={index} isOwn={peer == packet.peer} packet={packet} />
        ))}
        <p className="italic text-center" id="feedback">
          {feedback}
        </p>
      </div>
  );
}
