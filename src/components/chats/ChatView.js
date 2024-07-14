import { CiUser } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { useEffect, useState } from "react";
import moment from "moment";
import ChatContent from "./ChatContent";

export default function ({ socket, val, peer }) {
  const [name, setName] = useState(val);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(moment(Date.now()).fromNow());
  const [messages, setMessages] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    socket.on("chat-message", (data) => {
      addMessageToUI(false, data);
    });
    socket.on("feedback", (data) => {
      console.log(data);
      setFeedback(data);
    });
    return () => {
      socket.off("chat-message");
      socket.off("feedback");
    };
  }, [socket, feedback]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function sendMessage() {
    if (message.valueOf() === "") return;
    console.log(`value of message: ${message.valueOf()}`);
    const pkt = {
      name: name,
      message: message,
      date: date,
      isOwn: true,
    };
    socket.emit("message", pkt);
    addMessageToUI(true, pkt);
    setMessage("");
  }

  function addMessageToUI(isOwn, pkt) {
    setMessages((p) => [...p, { ...pkt, isOwn }]);
  }
  function scrollToBottom() {
    const chatContent = document.getElementById("chat-content");
    chatContent.scrollTo({ top: chatContent.scrollHeight, behavior: "smooth" });
  }

  function clearFeedback() {
    const messageInput = document.getElementById("message-input");
    messageInput.addEventListener("focus", (e) => {
      socket.emit("feedback", {
        feedback: `typing...`,
        peer: peer,
      });
    });
    messageInput.addEventListener("keypress", (e) => {
      socket.emit("feedback", {
        feedback: `typing...`,
        peer: peer,
      });
    });
    messageInput.addEventListener("blur", (e) => {
      socket.emit("feedback", {
        feedback: "",
        peer: peer,
      });
    });
  }

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
            readOnly={true}
          />
        </div>
        <ChatContent messages={messages} feedback={feedback} />
        <div className="flex justify-between w-full h-20 bg-[#ebebeb] rounded-t-2xl rounded-b-lg p-2">
          <textarea
            className="text-3xl grow text-[#7e7e7e] border-none outline-none bg-[#ebebeb] break-words h-16 scrollbar-hide"
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              clearFeedback();
            }}
            id="message-input"
          />
          <div className="w-1 bg-[#dddddd] rounded-xl"></div>
          <button
            className="flex justify-center content-center items-center text-[#7e7e7e]"
            onClick={(e) => sendMessage()}
          >
            <IoIosSend className="text-2xl" />
            <p className="text-2xl">send</p>
          </button>
        </div>
      </div>
    </div>
  );
}
