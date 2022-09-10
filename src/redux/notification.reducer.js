import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name:"NotficationSlice",
    initialState:{
        isVisible: false, content: ""
    },
    reducers:{
        showNotification: (state, action)=>{
            console.log("showing");
            return {isVisible: true, content: action.payload};
        },
        hideNotification: (state)=>{
            console.log("hiding");
            return {isVisible: false, content: ""};
        }
    }
});

export const {showNotification, hideNotification} = notificationSlice.actions;
export default notificationSlice.reducer;

export const notificationSelector = (state)=>{
    return state.notification;
}

export const showNotificationAsync = (content)=>(dispatch, getState)=>{
    dispatch(showNotification(content));
    setTimeout(()=>{dispatch(hideNotification())}, 5000);
}