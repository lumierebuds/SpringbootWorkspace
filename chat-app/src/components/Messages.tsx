// 채팅방의 메시지에 해당하는 컴포넌트

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ChatMessage } from "../type/type";
import MyChat from "./MyChat";
import OtherChat from "./OtherChat";

export default function Messages({chatMessages} : {chatMessages: ChatMessage[]}) {

    let { userNo } = useSelector((state: RootState) => state.user);

    return (
        <>
            
            {
                chatMessages.map((chat, index) => {
                    return (
                        chat.userNo ==  userNo? 
                        <MyChat key={index} chat={chat}/> : <OtherChat key={index} chat={chat} />
                    )
                })
            }
        </>
    )
}