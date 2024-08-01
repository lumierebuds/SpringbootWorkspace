package com.kh.api.auth.model.service;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.kh.api.auth.model.dto.KakaoUserInfoResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class KakaoApi {

	// webFlux 를 이용해 Kakao 로그인 요청보내기 
	private final WebClient webClient; // http 통신을 담당 
	
	// 요청보낼 url 주소 
	private static final String KAKAO_USER_INFO_URI = "https://kapi.kakao.com/v2/user/me";
	
	// 회원가입 + 로그인 
	public KakaoUserInfoResponse getUserInfo(String accessToken) {
		
		return webClient.get()
			.uri(KAKAO_USER_INFO_URI)
			.header("Authorization", "Bearer "+accessToken)
			.retrieve()
			.bodyToFlux(KakaoUserInfoResponse.class) // 반환타입 - 클래스 형태로 얻어오겠다.
			.blockFirst();
		
	}

}
