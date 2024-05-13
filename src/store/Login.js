import React from 'react';
import {createSlice} from '@reduxjs/toolkit';


const initialLoginState = {
    loginId:'',
    password:'',
    memberName:'',
};
const loginSlice = createSlice({
    name:'Login',
    initialState:initialLoginState,
    reducers:{
        login(state,action){  
            const {loginId, password, memberName} = action.payload 
            state.loginId=loginId,
            state.password=password,
            state.memberName=memberName

        },
        getnickName(state,action){
            state.memberName=action.payload
        },
        logout(state){
            state.loginId='',
            state.password='',
            state.memberName-''
        }
    }
})

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;