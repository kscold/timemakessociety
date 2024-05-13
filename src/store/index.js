import React from 'react'
import {createSlice,configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import loginReducer from './Login';
import timerReducer from './count';
const store = configureStore({
    reducer : {
        auth: authReducer,login:loginReducer,timer:timerReducer}
});

export default store;