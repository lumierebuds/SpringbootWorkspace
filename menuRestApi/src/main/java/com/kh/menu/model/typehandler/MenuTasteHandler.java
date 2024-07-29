package com.kh.menu.model.typehandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;

import com.kh.menu.model.vo.MenuTaste;
import com.kh.menu.model.vo.MenuTaste;

@MappedTypes(value= {MenuTaste.class, MenuTaste.class}) // 자바 타입 
@MappedJdbcTypes(JdbcType.VARCHAR) // DB 자료형  
public class MenuTasteHandler extends BaseTypeHandler<MenuTaste>{
	
	// MyBatis에서 사용하는 메서드들 
	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, MenuTaste parameter, JdbcType jdbcType)
			throws SQLException {
		ps.setString(i, parameter.getValue());
	}
	
	@Override
	public MenuTaste getNullableResult(ResultSet rs, String columnName) throws SQLException {
		
		return MenuTaste.menuTasteValueOf(rs.getString(columnName)); 
	}

	@Override
	public MenuTaste getNullableResult(ResultSet rs, int columnIndex) throws SQLException {

		return MenuTaste.menuTasteValueOf(rs.getString(columnIndex)); 
	}

	@Override
	public MenuTaste getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}
	
}
