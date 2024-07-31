import { KeyboardEvent, useEffect, useRef, useState } from "react";
import ChatRoomMembers from "../components/ChatRoomMembers";
import SockJs from 'sockjs-client';
import { Client } from "@stomp/stompjs";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ChatMessage, Member } from "../type/type";
import axios from "axios";
import Messages from "../components/Messages";

export default function ChattingRoom(){

    // 웹소켓 state
    const [webSocket, setWebSocket] = useState<Client>();
    // 서버 url
    const url = 'http://localhost:8083/chatApp';
    // 파람값
    const {chatRoomNo} = useParams();

    // 채팅메세지저장 state
    const [message, setMessage] = useState('');

    // textarea주소값을 저장할 ref
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // 
    const bottomRef = useRef<HTMLLIElement>(null);

    // 현재 접속중인 user정보
    const user = useSelector((state:RootState) => state.user);

    // 현재 채팅방 메세지 state
    const [chatMessage, setChatMessage] = useState<ChatMessage[]>([]);

    // 현재 채팅방 멤버를 저장할 state
    const [chatRoomMembers, setChatRoomMembers] = useState<Member[]>([]);

    // navigate함수
    const navi = useNavigate();

    // 웹소켓 연결
    useEffect(()=>{
      //npm i --save @types/sockjs-client
      const createWebSocket = () => new SockJs(url+"/stompServer");
      
      const stompClient = new Client({
        webSocketFactory : createWebSocket ,
        reconnectDelay : 10000,
        onConnect : (frame) => {
            console.log(frame);
            // 구독 1. 현재 채팅방에 메세지가 발행되는 경우
            stompClient.subscribe(`/chat/chatRoomNo/${chatRoomNo}/message`, (frame) => {
                const message = JSON.parse(frame.body);
                console.log(frame.body);
                // 의존성배열이 비어있는 useEffect함수 내부에서,
                // state값은 항상 "초기 랜더링시의 값"을 유지한다.
                // setChatMessage(
                //     [...chatMessage , message]
                // );
                setChatMessage((prevState)=> {
                    return [...prevState , message];
                })
            });

            // 구독 2. 채팅방에 새로운 사용자가 입장
            stompClient.subscribe(`/chat/chatRoomNo/${chatRoomNo}/newMember`, (frame) => {
                console.log(frame.body);
                let user = JSON.parse(frame.body);
                setChatRoomMembers((prevState) => {
                    let filterArr = prevState.filter((u) => u.userNo !== user.userNo);    
                    return [...filterArr, user];
                })
            });

            // 구독 3. 채팅방 사용자가 나가는 경우
            stompClient.subscribe(`/chat/chatRoomNo/${chatRoomNo}/exitMember`, (frame) =>{
                let user = JSON.parse(frame.body);
                setChatRoomMembers((prev) => {
                    return prev.filter( (member) => member.userNo !== user.userNo)
                })
            })

            // 구독 4. 채팅방에 접속중인 다른 사용자의 상태값(1 온라인, 2 오프라인)이 바뀔때
            stompClient.subscribe(`/chat/chatRoomNo/${chatRoomNo}/updateStatus` , (frame) => {
                // 바뀐유저정보
                // userStatus , userNo
                let user = JSON.parse(frame.body);

                setChatRoomMembers((prev) => {
                    return prev.map((member) => {
                        if(member.userNo == user.userNo){
                            return user;
                        }else{
                            return member;
                        }
                    })
                })
            })

            // 발행 1) CHAT_ROOM_JOIN테이블에 참여자 정보 추가
            stompClient.publish({
                destination : `/chat/chatRoomJoin/${chatRoomNo}/${user.userNo}/newMember`,
                body : JSON.stringify({})
            });

            // 발행 2) 유저 상태값 변경
            stompClient.publish({
                destination : `/chat/chatRoomJoin/chatRoomNo/${chatRoomNo}/updateStatus`,
                body : JSON.stringify({
                    ...user ,
                    userStatus : 1
                })
            })
        },
      });
      stompClient.activate();
      setWebSocket(stompClient);

      // 채팅방 메세지 가져오기
      axios.get(`${url}/chatMessage/chatRoomNo/${chatRoomNo}`)
        .then((res) => {
            setChatMessage(res.data);
        });
      // 채팅방 참여자 목록 가져오기
      axios.get(`${url}/chatRoomJoin/chatRoomNo/${chatRoomNo}`)
        .then((res) =>{
            setChatRoomMembers(res.data);
        })

       setTimeout(()=> {
           scrollToBottom()
       }, 100);

      return () => {
        // 컴포넌트 소멸시 웹소켓 해제
        stompClient.publish({
            destination : `/chat/chatRoomJoin/chatRoomNo/${chatRoomNo}/updateStatus`,
            body : JSON.stringify({
                ...user ,
                userStatus : 2
            })
        })

        stompClient.deactivate();//비활성화
      }
    },[])

    const submitMessage = (e:KeyboardEvent) => {
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            sendMessage();
            //textareaRef.current.value = "";            
        }
    }

    const sendMessage = () => {
        const chatMessage = {
            message, 
            chatRoomNo , 
            userNo : user.userNo
        };
        if(!message){
            alert("뭐든 입력하세요");
            return;
        }
        if(!user){
            alert("로그인 후 이용해주세요.");
            return;
        }
        if(!webSocket){
            alert("웹소켓 연결중입니다.");
            return;
        }
        webSocket
            .publish({
                destination: `/chat/sendMessage/chatRoomNo/${chatRoomNo}` ,
                headers : {},
                body : JSON.stringify(chatMessage)
            })
        setTimeout(()=> {
            scrollToBottom()
        }, 100);
    }

    const exitChatRoom = () => {
        webSocket?.publish({
            destination : `/chat/chatRoomJoin/${chatRoomNo}/${user.userNo}/delete` ,
            body : JSON.stringify(user)
        });
        setTimeout(()=>{
            navi("/");
        },100)
    }

    const scrollToBottom = () => {
        if(bottomRef.current){
            bottomRef.current.scrollIntoView({behavior:'smooth'});
        }
    }

    return (
        <div className="main">
            {/* 채팅방 참여자 목록 */}
            <ChatRoomMembers chatRoomMembers={chatRoomMembers}/>
            <div className="chatting-area">
                
                <div className="chat-header">
                    <button className="btn btn-outline-danger" onClick={exitChatRoom}>나가기</button>
                </div>

                {/* 채팅내용 */}
                <ul className="display-chatting">
                    <Messages chatMessages={chatMessage} />
                    <li ref={bottomRef}></li>
                </ul>

                <div className="input-area">
                    <textarea rows={3} name="message"
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        onKeyDown={submitMessage}
                    ></textarea>
                    <button onClick={sendMessage}>전송</button>
                </div>

            </div>

        </div>
    )
}