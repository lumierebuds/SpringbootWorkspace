import { useEffect, useRef, useState } from "react";
import ChatRoomMembers from "../components/ChatRoomMembers";
import SockJs from 'sockjs-client';
import { Client } from "@stomp/stompjs";
import { useParams } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

// 채팅방 컴포넌트
export default function ChattingRoom() {

    // 웹소캣 state 
    const [webSocket, setWebSocket] = useState<Client>(); 
    // 서버 url 
    const url = 'http://localhost:8083/chatApp';
    // 파람값 
    const { chatRoomNo } = useParams();


    // 채팅 메세지 저장 state
    const [message, setMessage] = useState('');

    // textarea주소값을 저장할 ref
    const textareaRef = useRef<HTMLTextAreaElement>(null); 
    
    // 현재 접속중인 user정보 
    const user = useSelector((state: RootState) => state.user);


    // 웹 소캣 연결
    useEffect(() => {
        // npm i --save @types/sockjs-client
        const createWebSocket = () => new SockJs(url+"/stompServer");// 스프링 부트에서 설정한 stompServer 경로로 소캣 연결

        const stompClient = new Client({ // 웹소캣 객체 설정하는 부분 
            webSocketFactory: createWebSocket, // 웹소캣을 생성할 수 있는 함수를 넣어줌 
            reconnectDelay: 10000, // 연결이 끊어졌을때 10초 딜레이후 다시 연결 시도 
            onConnect: (frame) => {
                console.log(frame);
                // 구독 1. 현재 채팅방에 메세지가 발행되는 경우
                stompClient.subscribe(`/chat/chatRoomNo/${chatRoomNo}/message`, (frame) => { //  메시지 브로커가 /chat 경로를 중계한다. 
                    console.log(frame);
                });
            }
        }); 

        stompClient.activate(); // 웹 소캣 객체를 활성화한다. 
        setWebSocket(stompClient); // 클라이언트 타입의 값으로 설정

        return () => {
            // 컴포넌트 소멸시 웹소캣 해제

            stompClient.deactivate(); // 웹소캣 객체 비활성화 

        }
    }, [])

    const submitMessage = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) { // 시프트 키를 누르지 않고 기본 엔터키를 눌렀을때 '메시지 전송' 
            e.preventDefault();
            sendMessage();
            // textareaRef.current.value = ""; 
        } 
    }

    const sendMessage = () => {

        const chatMessage = {
            message,
            chatRoomNo,
            userNo : user.userNo 
        }
        // 입력된 메시지가 없을때 
        if (!message) {
            alert("뭐든 입력하세요");
            return;
        }
        
        // 로그인하지 않았을때 
        if (!user) {
            alert("로그인 후 이용해주세요.");
            return; 
        }

        if (!webSocket) {
            alert("웹소캣 연결중입니다.");
            return; 
        }
        webSocket
            .publish({
                destination: `/chat/sendMessage/chatRoomNo/${chatRoomNo}`,
                headers: {}, 
                body: JSON.stringify(chatMessage)
            })
    }
    
    return (
        <div className="main">
            {/* 채팅방 참여자 목록*/}
            <ChatRoomMembers/>
            <div className="chatting-area">
                <div className="chat-header">
                    <button className="btn btn-outline-danger">
                        나가기
                    </button>
                </div>

                {/* 채팅내용 */}
                <ul className="display-chatting">

                </ul>
                <div className="input-area">
                    <textarea rows={3} name="message"
                        ref={textareaRef} 
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value); 
                        }} 
                        onKeyDown={()=> submitMessage} 
                    > 
                    </textarea>
                    <button onClick={sendMessage}>전송</button>
                </div>

            </div>


        </div>
    )
}