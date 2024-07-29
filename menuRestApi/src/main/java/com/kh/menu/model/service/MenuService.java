package com.kh.menu.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kh.menu.model.vo.Menu;

@Service
public interface MenuService {

	List<Menu> selectMenus();

	int insertMenu(Menu menu);

	List<Menu> searchMenu(Map<String, Object> param);

	Menu selectOneMenu(int id);

	int updateMenu(Menu menu);

	int deleteMenu(int id);

}
