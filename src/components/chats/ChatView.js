import { CiUser } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { useEffect, useState } from "react";
import ChatContent from "./ChatContent";

export default function ({
  val,
  peer,
  sender,
  clearFeedback,
  feedback,
}) {
  const [name, setName] = useState(val[0]);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(Date.now());
  const [messages, setMessages] = useState([]);
  const [scroll, setScroll] = useState(true);
  let msgs = [];

  useEffect(() => {
    const getData1 = async () => {
      var cred = {
        peer: peer._id,
        sender: sender._id,
      };
      let response = await fetch("/api/getMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cred),
      });
      response = await response.json();
      msgs = response;
      msgs.map((msg)=>addMessageToUI(false, msg));
      getData2();
    };
    getData1();
    scrollToBottom();
    const getData2 = async () => {
      var cred = {
        peer: sender._id,
        sender: peer._id,
      };
      let response = await fetch("/api/getMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cred),
      });
      let intervalID;
      intervalID = setInterval(getData1, 10000);
      response = await response.json();
      response.map((e) => msgs.push(e));
      msgs.push((msg)=>addMessageToUI(false, msg));
      msgs.sort((a, b) => new Date(a.date) - new Date(b.date));
      setMessages(msgs);
    };
    return()=>{
      clearInterval(intervalID);
    }
  }, []);

  const sendMessage = async () => {
    if (message.valueOf() === "") return;
    console.log(`value of message: ${message.valueOf()}`);
    const pkt = {
      message: message,
      date: date,
      peer: peer._id,
      sender: sender._id,
    };
    let response = await fetch("/api/postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pkt),
    });
    setMessage("");
    setScroll(true);
    response = await response.json();
    console.log(response["message"]);
    addMessageToUI(true, pkt);
  };

  const addMessageToUI = (isOwn, pkt)=>{
    setMessages((p)=>[...p, {pkt}]);
  }

  function scrollToBottom() {
    const chatContent = document.getElementById("chat-content");
    chatContent.scrollTo({ top: chatContent.scrollHeight, behavior: "smooth" });
    setScroll(false);
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
        <ChatContent
          messages={messages}
          feedback={feedback}
          peer={peer}
          sender={sender}
          func={scrollToBottom}
          scroll={scroll}
        />
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
            onClick={(e) => {
              sendMessage();
              setScroll(true)
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
