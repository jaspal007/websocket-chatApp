import ChatRoom from "@/components/ChatRoom";
import IChat from "@/components/iChat";
import { useRouter } from "next/router"

export default function(){
    const router = useRouter();
    return (
        <div>
        {router.query.user}
        <div>
            <IChat/>
            <ChatRoom slug={router.query.slug}/>
        </div>
        </div>
    )
}