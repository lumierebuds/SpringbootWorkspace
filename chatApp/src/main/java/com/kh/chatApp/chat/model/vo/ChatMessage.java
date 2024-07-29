package com.kh.chatApp.chat.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
	
	private int cmNo;
	private String message; 
	private String createDate; 
	private int chatRoomNo; 
	private int userNo;

}
