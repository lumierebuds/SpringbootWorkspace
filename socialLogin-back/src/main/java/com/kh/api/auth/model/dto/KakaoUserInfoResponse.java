package com.kh.api.auth.model.dto;

import lombok.Getter;

// dto : API 서버를 통해 받아오는 데이터를 가져오는것만 하기 때문에 setter는 필요없음
@Getter
public class KakaoUserInfoResponse {
	
	private Long id;
	private Boolean has_signed_up;
	
	private KakaoAccount kakao_account; 
	private Properties properties; 
	
	@Getter
	public static class KakaoAccount { // inner 클래스로 작성해서 타입 지정 
		private Boolean profile_needs_agreement;
		private Boolean profile_nickname_needs_agreement;
		private Boolean profile_image_needs_agreement;
	}
	
	@Getter
	public static class Properties{
		private String nickname;
		private String profile_image;
		private String thumbnail_image;
	}
}
