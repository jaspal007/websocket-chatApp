import Message from "./Message";

export default function ({packet}) {

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <Message isOwn={true} packet={packet}/>
      <Message isOwn={!true} packet={packet}/>
      <Message isOwn={true} packet={packet}/>
      <p className="italic text-center">✍️ anonymous is typing...</p>
    </div>
  );
}
