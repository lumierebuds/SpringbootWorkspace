package com.kh.chatApp.chat.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

// 해당 프로그램의 설정 파일로 역할을 하려고할때는 @Configuration 어노테이션 사용
/*
 * Stomp? 
 * 
 * - publish 발행 / subscribe 구독패턴
 * - 특정 url을 구독하고 있는 클라이언트에게 메시지를 "발행"해줌
 *  
 * 
 */


@EnableWebSocketMessageBroker
@Configuration
public class StompConfig implements WebSocketMessageBrokerConfigurer {

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		
		registry
		.addEndpoint("/stompServer")
		.setAllowedOriginPatterns("*")
		.withSockJS();
	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		// TODO Auto-generated method stub
		WebSocketMessageBrokerConfigurer.super.configureMessageBroker(registry);
	}
	
	
}
