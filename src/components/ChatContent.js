import Message from "./Message";

export default function ({ messages, feedback }) {
  return (
    <div className="h-lvh overflow-y-scroll scrollbar-hide pb-10" id="chat-content">
      {messages.map((packet, index)=>(
        <Message key={index} isOwn={packet.isOwn} packet={packet} />
      ))}
      {/* <Message isOwn={!true} packet={packet} />
      <Message isOwn={true} packet={packet} /> */}
      <p className="italic text-center" id="feedback">{feedback}</p>
    </div>
  );
}
