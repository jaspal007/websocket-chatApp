import moment from "moment-timezone";
import { Socket } from "../socket";

export default function ({ isOwn, packet, peer, sender}) {
  // console.log(packet);
  return (
    <div
      className={`w-full p-3 ${
        isOwn ? "flex justify-end" : "flex justify-start"
      }`}
    >
      {!isOwn ? (
        <div className="flex flex-col items-start">
          <div className="flex items-end">
            <img
              src="/assets/images.jpg"
              className="rounded-full w-9 h-9 mt-auto"
            />
            <div className="min-w-48 p-3 shadow-xl rounded-t-3xl rounded-r-3xl bg-[#f6f6f6] text-start justify-items-end justify-self-end w-fit m-3 h-fit break-words max-w-96">
              <p className="font-extrabold text-xl mb-1">{peer.username}</p>
              <p className="text-lg -mb-2">{packet.message}</p>
              <p className="font-thin italic text-end pt-2">
                {moment(packet.date).format("dddd, MMMM Do YYYY, hh:mm A")}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start">
          <div className="flex items-end">
            <div className="min-w-48 p-3 m-3 shadow-xl bg-[#7e7e7e] rounded-t-3xl rounded-l-3xl w-fit h-fit max-w-96 break-words">
              <p className="font-extrabold text-xl mb-1">{sender.username}</p>
              <p className="text-lg -mb-2">{packet.message}</p>
              <p className="font-thin italic text-end pt-2">
                {moment(packet.date).format("dddd, MMMM Do YYYY, hh:mm A")}
              </p>
            </div>
            <img
              src="/assets/images.jpg"
              className="rounded-full w-9 h-9 mt-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
