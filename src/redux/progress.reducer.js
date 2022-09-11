import { createSlice } from "@reduxjs/toolkit";

const progressSlice = createSlice({
    name: "ProgressBar",
    initialState: {enabled: false},
    reducers:{
        showProgressBar: (state)=>{
            console.log("enabling progress");
            return {enabled: true}
        },
        hideProgressBar: (state)=>{
            console.log("disabling progress");
            return {enabled: false}
        }
    }
});

export const {showProgressBar, hideProgressBar} = progressSlice.actions;
export default progressSlice.reducer;

export const isProgressEnabled = (state)=> state.progress.enabled;