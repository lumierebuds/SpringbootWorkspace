package com.kh.chatApp.chat.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.chatApp.chat.model.vo.ChatMessage;
import com.kh.chatApp.chat.model.vo.ChatRoom;
import com.kh.chatApp.chat.model.vo.ChatRoomJoin;
import com.kh.chatApp.chat.model.vo.Member;


@Service
public interface ChatService {
	
	List<Member> selectAllUser();

	List<ChatRoom> selectChatRooms();

	int openChatRoom(ChatRoom cr);

	ChatMessage insertChatMessage(ChatMessage chatMessage);

	void joinChatRoom(ChatRoomJoin crj);

	Member selectUser(ChatRoomJoin crj);

	List<ChatMessage> selectMessages(int chatRoomNo);


	List<Member> selectChatRoomMembers(int chatRoomNo);

	void exitMember(ChatRoomJoin crj);

	void updateUserStatus(ChatRoomJoin crj);

	

	
	
}
