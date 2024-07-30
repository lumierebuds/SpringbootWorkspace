package com.kh.chatApp.chat.websocket.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import com.kh.chatApp.chat.model.service.ChatService;
import com.kh.chatApp.chat.model.vo.ChatMessage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatStompController {
	
	private final ChatService service; 
	
	@MessageMapping("/chat/sendMessage/chatRoomNo/{chatRoomNo}")
	public ChatMessage insertChatMessage(
			@DestinationVariable int chatRoomNo, // @PathVariable대신에 쓰이는것 
			ChatMessage chatMessage // 채팅 메시지 객체
			) {
		
		log.info("chatRoomNo ? {}", chatRoomNo);
		log.info("chatMessage ? {}", chatMessage);
		return null;
	}
}
