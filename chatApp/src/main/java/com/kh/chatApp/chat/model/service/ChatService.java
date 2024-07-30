package com.kh.chatApp.chat.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.chatApp.chat.model.vo.ChatRoom;
import com.kh.chatApp.chat.model.vo.Member;


@Service
public interface ChatService {
	
	List<Member> selectAllUser();

	List<ChatRoom> selectChatRooms();

	int openChatRoom(ChatRoom cr);
	

}
