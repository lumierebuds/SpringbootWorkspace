package com.kh.menu.model.vo;

import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;


public enum MenuTaste {
	
	Mild("mild"), HOT("hot");
	
	private String value; 
	MenuTaste(String value){
		this.value = value; 
	}
	
	@JsonValue
	public String getValue() {
		return value;
	}
	
	
	public static MenuTaste menuTasteValueOf(String value) {
		MenuTaste[] menus = MenuTaste.values();
		for(MenuTaste mt : menus) {
			if(mt.value.equals(value)) return mt; 
		}
		throw new AssertionError("Unknown Type : "+value);
	}
	
	
}
