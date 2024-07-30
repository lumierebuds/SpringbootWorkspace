package com.kh.chatApp.chat.model.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.kh.chatApp.chat.model.vo.ChatRoom;
import com.kh.chatApp.chat.model.vo.Member;

@Repository
public interface ChatDao {

	List<Member> selectAllUser();

	List<ChatRoom> selectChatRooms();

	int openChatRoom(ChatRoom cr);

}
