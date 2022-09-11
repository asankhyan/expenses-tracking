import { createSlice } from "@reduxjs/toolkit";

export const NotificationTypes = {
    Success: "success",
    Error: "error",
}
const notificationDefaultState = {
    isVisible: false, content: "", type: NotificationTypes.Success
};

const notificationSlice = createSlice({
    name:"NotficationSlice",
    initialState: notificationDefaultState,
    reducers:{
        showNotification: (state, action)=>{
            const {content, type} = action.payload;
            const newState = {isVisible: true, content: content};
            if(type){
                newState.type = type;
            }
            return newState;
        },
        hideNotification: (state)=>{
            return notificationDefaultState;
        }
    }
});

export const {showNotification, hideNotification} = notificationSlice.actions;
export default notificationSlice.reducer;

export const notificationSelector = (state)=>{
    return state.notification;
}

export const showNotificationAsync = (content, type)=>(dispatch, getState)=>{
    dispatch(showNotification({content, type}));
    // setTimeout(()=>{dispatch(hideNotification())}, 5000);
}