package com.kh.menu.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.menu.model.service.MenuService;
import com.kh.menu.model.vo.Menu;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController // Controller + ResponseBody
@RequiredArgsConstructor
public class MenuController {
	
	private final MenuService menuService;
	
	@GetMapping("/menus")
	public List<Menu> menus(HttpServletResponse response){
		
		// 1. 업무로직 
		List<Menu> list = menuService.selectMenus();
		log.debug("list {}", list);
		
		response.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:3000"); 
		// 허용하고자 하는 오리진으로 부터 요청이 들어올때 응답을 할 수 있도록 설정
		// localhost:3000번을 통해 들어온 요청에 응답을 할 수 있음
		return list;
	}
	
	
	@CrossOrigin(origins = {"http://localhost:3000"})
	@PostMapping("/menu")
	public Map<String, Object> insertMenu(@RequestBody Menu menu){
		
		// 1. 업무로직 
		log.debug("menu {}", menu);
		
		int result = menuService.insertMenu(menu);
		Map<String, Object> map = new HashMap<>();
		
		if(result > 0) {
			map.put("msg", "게시글 작성 성공");
		} else {
			map.put("msg", "게시글 작성 실패");
		}
		
		return map;
	}
	
	
	@CrossOrigin(origins = {"http://localhost:3000"})
	@GetMapping("/searchMenu/type/{type}/taste/{taste}")
	public List<Menu> searchMenu(
			@PathVariable String type, 
			@PathVariable String taste
			){
		
		log.debug("type = {}, taste = {}", type, taste);
		Map<String, Object> param = new HashMap<>();
		param.put("type", type);
		param.put("taste", taste);
		
		List<Menu> list = menuService.searchMenu(param); 
		log.debug("list = {}", list);
		
		return list;
	}
	
	@CrossOrigin(origins = {"http://localhost:3000"})
	@GetMapping("/menu/{id}")
	public Menu selectOneMenu(
			@PathVariable int id 
			) {
		
		log.debug("id = {}", id); 
		Menu menu = menuService.selectOneMenu(id);
		log.debug("menu = {}", menu);
		
		return menu;
		
	}
	
	@CrossOrigin(origins = {"*"})
	@PutMapping("/menu/{id}") 
	public ResponseEntity<String> updateMenu(
			@RequestBody Menu menu){
		// ResponseEntity : HttpRequest에 대한 응답 데이터를 포함하는 클래스 
		
		log.debug("menu =  {} ", menu);
		int result = menuService.updateMenu(menu);
		if(result > 0) {
			return ResponseEntity.ok().body("수정성공");
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	
	@CrossOrigin(origins = {"*"})
	@DeleteMapping("/menu/{id}")
	public ResponseEntity<String> deleteMenu(
				@PathVariable int id
			){
		log.debug("id = {}", id);
		int result = menuService.deleteMenu(id);
		if(result>0) {
			return ResponseEntity.ok().body("삭제성공");
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	
	
}
