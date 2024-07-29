package com.kh.chatApp.chat.controller;

import org.springframework.web.bind.annotation.RestController;

import com.kh.chatApp.chat.model.service.ChatService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {
	
	private final ChatService chatService;
	
	
}
