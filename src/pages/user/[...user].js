import ChatRoom from "@/components/chatRoom/ChatRoom";
import IChat from "@/components/iChat";
import { useRouter } from "next/router"

export default function(){
    const router = useRouter();
    return (
        <div>
        {router.query.user}
        <div>
            <IChat/>
            <ChatRoom usr={router.query.user}/>
        </div>
        </div>
    )
}