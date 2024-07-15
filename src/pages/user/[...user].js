import ChatRoom from "@/components/chatRoom/ChatRoom";
import IChat from "@/components/iChat";
import { useRouter } from "next/router";

export default function () {
  const router = useRouter();
  let data = JSON.parse(router.query.user);
  return (
    <div>
      <div className="bg-[#ebebeb] text-[#3a3a3a]">
        <div className="text-7xl p-5">
            {(data.name)}
        </div>
        <div className="text-4xl px-5 pb-5">
            {data.username}
        </div>
      </div>
      <div>
        <IChat />
        <ChatRoom usr={data.username} />
      </div>
    </div>
  );
}


//so that the id data doesn't disappear on reload
export async function getServerSideProps(context) {
    return {
      props: {},
    };
  }