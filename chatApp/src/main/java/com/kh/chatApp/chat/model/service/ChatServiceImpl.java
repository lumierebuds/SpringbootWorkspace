package com.kh.chatApp.chat.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.chatApp.chat.model.dao.ChatDao;
import com.kh.chatApp.chat.model.vo.ChatRoom;
import com.kh.chatApp.chat.model.vo.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{
	
	private final ChatDao dao;

	@Override
	public List<Member> selectAllUser() {
		
		return dao.selectAllUser();
	}

	@Override
	public List<ChatRoom> selectChatRooms() {
		
		return dao.selectChatRooms();
	}

	@Override
	public int openChatRoom(ChatRoom cr) {
		
		return dao.openChatRoom(cr);
	}
	
}
