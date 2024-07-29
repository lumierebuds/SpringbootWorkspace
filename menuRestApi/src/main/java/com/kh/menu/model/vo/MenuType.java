package com.kh.menu.model.vo;

import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;


public enum MenuType {
	KR("kr"), CH("ch"), JP("jp");
	
	private String value;
	MenuType(String value){
		this.value = value;
	}
	
	@JsonValue
	public String getValue() {
		return this.value;
	}
	
	public static MenuType menuTypeValueOf(String value) {
		switch(value) {
		case "kr" : return KR;
		case "ch" : return CH;
		case "jp" : return JP;
		default : 
			throw new AssertionError("unknown Type : " + value);
		}
	}
	
	
}