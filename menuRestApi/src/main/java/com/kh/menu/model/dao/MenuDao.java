package com.kh.menu.model.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.kh.menu.model.vo.Menu;

@Repository
public interface MenuDao {

	List<Menu> selectMenus();

	int insertMenu(Menu menu);

	List<Menu> searchMenu(Map<String, Object> param);

	Menu selectOneMenu(int id);

	int updateMenu(Menu menu);

	int deleteMenu(int id);
	
}
