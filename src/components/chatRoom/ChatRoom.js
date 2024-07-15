import { useEffect, useState } from "react";
import ChatTile from "./ChatTile";
import { useRouter } from "next/router";

export default function ({usr}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const callData = async () => {
      const data = await fetch("/api/getUsers").then((data) => data.json());
      setUsers(data);
      setLoading(false);
      localStorage.setItem('users', JSON.stringify(data));
    };
    callData();
    // let intervalID = setInterval(callData, 30000);
    return()=>{
      // clearInterval(intervalID);
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col border-[#dddddd] border-solid border-8 rounded-2xl w-3/4 h-[700px]">
        <div className="flex justify-between w-full h-16 bg-[#ebebeb] p-2 rounded-b-xl rounded-t-lg shadow-xl shadow-gray-400 mb-2">
          <h2 className="flex text-3xl font-semibold w-full justify-center">
            {`Chat Room (${users.length})`}
          </h2>
        </div>
        {loading ? (
          <div className="flex text-center justify-center self-center align-middle h-full items-center text-4xl text-[#7e7e7e]">Loading...</div>
        ) : (
          <div className="overflow-y-scroll scrollbar-hide">
            {users.map((user) => ( user.username!=usr && 
              <ChatTile
                user={user}
                onClick={(e) => {
                  console.log(`clicked the user: ${user.name}`);
                  router.push(`/chat/${[user.username, usr]}`);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
