import React from 'react'
import {createSlice,configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from './auth';
import loginReducer from './Login';
import timerReducer from './count';
import readArticleReducer from './readArticles';
// const reducers = combineReducers=({
//     timer: timerReducer,
//     auth:authReducer,
//     login:loginReducer
// })
// const persistConfig = {
//     key:'root',
//     storage,
//     whitelist:['timer']
// }
// const persistedReducer = persistedReducer(persistConfig,reducers);

// const store = configureStore({
//     reducer: persistedReducer,
// })
const store = configureStore({
    reducer : {
        auth: authReducer,
        login:loginReducer,
        timer:timerReducer,
        readArticle:readArticleReducer,
    }
});

export default store;