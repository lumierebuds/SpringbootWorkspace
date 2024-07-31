package com.kh.chatApp.chat.websocket.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import com.kh.chatApp.chat.model.service.ChatService;
import com.kh.chatApp.chat.model.vo.ChatMessage;
import com.kh.chatApp.chat.model.vo.ChatRoomJoin;
import com.kh.chatApp.chat.model.vo.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatStompController {
	
	private final ChatService service; 
	
	@MessageMapping("/sendMessage/chatRoomNo/{chatRoomNo}") 
	@SendTo("/chat/chatRoomNo/{chatRoomNo}/message") // 구독하고 있는 사용자에게 반환하는 경로 
	public ChatMessage insertChatMessage(
			@DestinationVariable int chatRoomNo, // @PathVariable대신에 쓰이는것 
			ChatMessage chatMessage // 채팅 메시지 객체
			) {
		
		log.info("chatRoomNo ? {}", chatRoomNo);
		log.info("chatMessage ? {}", chatMessage);
		
		// 1) DB에 채팅메시지 등록
		// 2) 같은방 사용자에게 채팅내용 전달 
		
		return service.insertChatMessage(chatMessage);
		
		
	}
	
	
	@MessageMapping("/chatRoomJoin/{chatRoomNo}/{userNo}/newMember")
	@SendTo("/chat/chatRoomNo/{chatRoomNo}/userNo/{userNo}/newMember")
	public Member newMember(
			@DestinationVariable int chatRoomNo,
			@DestinationVariable int userNo, 
			ChatRoomJoin crj,
			Member m
			) {
		 
		crj.setChatRoomNo(chatRoomNo);
		crj.setUserNo(userNo);
		
		log.info("crj = {}", crj);
		// 1) ChatRoomJoin에 데이터 추가 
		service.joinChatRoom(crj);
		
		// 2) 참여한 회원정보 조회
		m = service.selectUser(crj);
		
		return m;
		
	}
	
	@MessageMapping("/chatRoomJoin/{chatRoomNo}/{userNo}/delete")
	@SendTo("/chat/chatRoomNo/{chatRoomNo}/exitMember")
	public Member exitMember(
			@DestinationVariable int chatRoomNo,
			@DestinationVariable int userNo,
			@RequestBody Member m 
			) {
		// ChatRoomJoin 테이블에서 데이터 제거 
		ChatRoomJoin crj = new ChatRoomJoin(); 
		crj.setUserNo(userNo);
		crj.setChatRoomNo(chatRoomNo);
		
		service.exitMember(crj);
		
		// 나가기한 회원정보 반환
		
		return m;
	}
	
	@MessageMapping("/chatRoomJoin/chatRoomNo/{chatRoomNo}/updateStatus")
	@SendTo("/chat/chatRoomNo/{chatRoomNo}/updateStatus")
	public Member updateUserStatus(
			@DestinationVariable int chatRoomNo,
			@RequestBody Member m
			) {
		ChatRoomJoin crj = new ChatRoomJoin();
		crj.setUserNo(m.getUserNo());
		crj.setChatRoomNo(chatRoomNo);
		crj.setUserStatus(m.getUserStatus());
		
		service.updateUserStatus(crj);
		
		return m;
		
	}
	
}
