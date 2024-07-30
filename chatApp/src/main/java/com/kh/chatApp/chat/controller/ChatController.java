package com.kh.chatApp.chat.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.chatApp.chat.model.service.ChatService;
import com.kh.chatApp.chat.model.vo.ChatMessage;
import com.kh.chatApp.chat.model.vo.ChatRoom;
import com.kh.chatApp.chat.model.vo.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {
		
	private final ChatService service;
	
	// 사용자 목록을 반환한다.
	@GetMapping("/allUsers")
	public List<Member> selectAllUser(){
		return service.selectAllUser();
	}
	
	
	// 채팅방 목록을 반환한다. 
	@GetMapping("/chatRoomList")
	public List<ChatRoom> selectChatRooms(){
		return service.selectChatRooms();
	}
	
	// 채팅방을 생성한다 - 생성한 이후 바로 채팅방으로 이동하게 한다.
	@PostMapping("/openChatRoom")
	public int openChatRoom(@RequestBody ChatRoom cr) {
		service.openChatRoom(cr);
		return cr.getChatRoomNo();
	}
	
	
	
	
}
