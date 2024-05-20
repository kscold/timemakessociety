import React from 'react';
import {createSlice} from '@reduxjs/toolkit';
const readList = localStorage.getItem('readArticles'); 

const initialReadState = {

    readAriticleList: [],

}

const readAriticles =createSlice({
    name:'readArticles',
    initialState:initialReadState,
    reducers:{
        plus(state,action){
            if(!state.readAriticleList.includes(action.payload)){
                Array.isArray(state.readAriticleList)&& state.readAriticleList.push(action.payload);
                localStorage.setItem('readArticles',(state.readAriticleList))
            }
            
        },
    }
})

export const readAriticlesActions = readAriticles.actions;
export default readAriticles.reducer;