package com.kh.api.auth.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.api.auth.model.dao.AuthDao;
import com.kh.api.auth.model.dto.KakaoUserInfoResponse;
import com.kh.api.auth.model.dto.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
	
	private final KakaoApi kakaoApi;
	private final AuthDao authDao;
	
	@Transactional(readOnly = true, rollbackFor = Exception.class)
	public User login(String accessToken) {
		// 카카오 서버에 유저데이터 요청
		KakaoUserInfoResponse userInfo =  kakaoApi.getUserInfo(accessToken);
		log.info("userInfo ?? {} ", userInfo);
		
		Long socialId = userInfo.getId();
		
		// 현재 여러분들 어플리케이션(스프링 어플리케이션)에 사용자 정보가 있는지 조회.
		User user = authDao.loadUserByUsername(socialId, "kakao"); // 아이디, 소셜로그인 타입 
		// 처음 로그인 하면 user가 null일것
		
		if (user == null) {
			// 회원가입 
			String nickname = userInfo.getProperties().getNickname();
			String profile = userInfo.getProperties().getProfile_image();
			
			User m = User.builder()
						.nickName(nickname)
						.profile(profile)
						.socialId(String.valueOf(socialId))
						.socialType("kakao")
						.build();
		
			authDao.insertUser(m); // member 테이블에 추가
			authDao.insertUserSocial(m); // member_social 테이블에 추가
			authDao.insertAuthority(m); // authority 테이블에 추가 
			
			user = authDao.loadUserByUsername(socialId, "kakao"); // 다시 조회하기 
			
		}
		
		return user; 
		
	}

}
