package com.kh.chatApp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
			
		registry.addMapping("/**") // 모든 요청경로에 대해서 
			.allowedMethods("*") // 허용 HTTP 메서드 
			.allowedOrigins("http://localhost:3000"); // 해당 오리진을 통해 들어오는 요청을 허용
		
	}
	
	

}
