package com.kh.chatApp.chat.model.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.kh.chatApp.chat.model.vo.ChatMessage;
import com.kh.chatApp.chat.model.vo.ChatRoom;
import com.kh.chatApp.chat.model.vo.ChatRoomJoin;
import com.kh.chatApp.chat.model.vo.Member;

@Repository
public interface ChatDao {

	List<Member> selectAllUser();

	List<ChatRoom> selectChatRooms();

	int openChatRoom(ChatRoom cr);

	void insertChatMessage(ChatMessage chatMessage);
	
	ChatMessage selectChatMessage(int cmNo);

	void joinChatRoom(ChatRoomJoin crj);

	Member selectUser(ChatRoomJoin crj);

	List<ChatMessage> selectMessages(int chatRoomNo);


	List<Member> selectChatRoomMembers(int chatRoomNo);


	void exitMember(ChatRoomJoin crj);

	void updateUserStatus(ChatRoomJoin crj);

	
}
