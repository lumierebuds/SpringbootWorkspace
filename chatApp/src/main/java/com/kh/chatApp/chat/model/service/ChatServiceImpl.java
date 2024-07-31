package com.kh.chatApp.chat.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.chatApp.chat.model.dao.ChatDao;
import com.kh.chatApp.chat.model.vo.ChatMessage;
import com.kh.chatApp.chat.model.vo.ChatRoom;
import com.kh.chatApp.chat.model.vo.ChatRoomJoin;
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

	@Override
	public ChatMessage insertChatMessage(ChatMessage chatMessage) {
		
		
		dao.insertChatMessage(chatMessage);
		return dao.selectChatMessage(chatMessage.getCmNo());
		
	}

	@Override
	public void joinChatRoom(ChatRoomJoin crj) {
		try {
			dao.joinChatRoom(crj);
		} catch(Exception e) {
			
		}
		
	}

	@Override
	public Member selectUser(ChatRoomJoin crj) {
		
		return dao.selectUser(crj);
	}

	@Override
	public List<ChatMessage> selectMessages(int chatRoomNo) {
		
		return dao.selectMessages(chatRoomNo);
	}


	@Override
	public List<Member> selectChatRoomMembers(int chatRoomNo) {
		
		return dao.selectChatRoomMembers(chatRoomNo);
	}


	@Override
	public void exitMember(ChatRoomJoin crj) {
		
		dao.exitMember(crj);
		
	}

	@Override
	public void updateUserStatus(ChatRoomJoin crj) {
	
		dao.updateUserStatus(crj);
		
	}

	
}
