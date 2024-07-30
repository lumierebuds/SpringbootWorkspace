import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initMember, Member } from "../type/type";


const userSlice = createSlice({
    name: 'user',
    initialState: initMember,
    reducers: {
        setUser: (state, action: PayloadAction<Member>) => { // 로그인이라 생각하면 된다. 다만, 실제 로그인 작업은 백엔드에서 작업하기 때문에 값만 설정해주는것에 해당
            return action.payload;
        },
        logOut: (state) => {
            return initMember; // 초기값으로 되돌린다. 
        }
    }
}); 


export const { logOut, setUser } = userSlice.actions;
export default userSlice.reducer;

