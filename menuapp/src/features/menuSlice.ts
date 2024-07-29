import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialMenuList, Menu } from "../type/menu";

let menuSlice = createSlice({
  name: "menu",
  initialState: initialMenuList,
  reducers: {
      selectAllMenu: (state, action: PayloadAction<Menu[]>) => {
        // 전달되는 매개변수는 axios로 받아온 리스트
        return action.payload; // 받아온값 바로 반환  
      },
  },
});

export const { selectAllMenu } = menuSlice.actions;
export default menuSlice.reducer;
