package com.kh.chatApp.chat.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.chatApp.chat.model.vo.ChatMessage;
import com.kh.chatApp.chat.model.vo.ChatRoom;
import com.kh.chatApp.chat.model.vo.ChatRoomJoin;
import com.kh.chatApp.chat.model.vo.Member;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ChatDaoImpl implements ChatDao {
	
	private final SqlSessionTemplate session;

	@Override
	public List<Member> selectAllUser() {
		
		return session.selectList("member.selectAll");
	}

	@Override
	public List<ChatRoom> selectChatRooms() {
		return session.selectList("chat.selectChatRooms");
	}

	@Override
	public int openChatRoom(ChatRoom cr) {
	
		return session.insert("chat.openChatRoom", cr);
	}

	@Override
	public int insertChatMessage(ChatMessage chatMessage) {
		
		return session.insert("chat.insertChatMessage", chatMessage);
		
	}
	
	@Override
	public ChatMessage selectChatMessage(int cmNo) {
		
		return session.selectOne("chat.selectChatMessage", cmNo);
	}

	@Override
	public void joinChatRoom(ChatRoomJoin crj) {
		
		session.insert("chat.joinChatRoom", crj);
		
	}

	@Override
	public Member selectUser(ChatRoomJoin crj) {
		
		return session.selectOne("chat.selectUser", crj);
	}

	@Override
	public List<ChatMessage> selectMessages(int chatRoomNo) {
		
		return session.selectList("chat.selectMessages", chatRoomNo);
	}



	@Override
	public List<Member> selectChatRoomMembers(int chatRoomNo) {
		
		return session.selectList("chat.selectChatRoomMembers", chatRoomNo);
	}


	@Override
	public void exitMember(ChatRoomJoin crj) {
		session.delete("chat.exitMember", crj);
		
	}

	@Override
	public void updateUserStatus(ChatRoomJoin crj) {
		
		session.update("chat.updateUserStatus", crj);
	}


}
