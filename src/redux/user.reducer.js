import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "UserSlice",
    initialState:{name:"", profilePic:"", email:""},
    reducers:{
        setUserInfo:(state, action)=>{
            return action.payload;
        }
    }
});

export default userSlice.reducer;
export const {setUserInfo} = userSlice.actions

export const userSelector = state => state.user;

export const getUserEmail = (state)=>{
    return state.user.email;
}