package com.kh.chatApp.chat.model.service;

import org.springframework.stereotype.Service;

import com.kh.chatApp.chat.model.dao.ChatDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{
	
	private final ChatDao chatDao;
	
}
