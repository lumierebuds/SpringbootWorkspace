// 본인이 보낸 메시지

import { ChatMessage } from "../type/type";

export default function MyChat({ chat }: { chat: ChatMessage }) {

    return (
        <li className="myChat">
            <span className="chatDate">{chat.createDate}</span>
            <p className="chat">{chat.message}</p>
        </li>
    )

}