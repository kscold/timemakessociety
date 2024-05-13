import React from 'react';
import {createSlice,configureStore} from '@reduxjs/toolkit';

const initialTimerState = {
    running:true,
    timer:'',
    modifiedTimer: 0
}

const timerSlice = createSlice({
    name:'Timer',
    initialState:initialTimerState,
    reducers:{
        timer(state,action){
            state.timer = action.payload
            
        },
        tick(state){
            if(state.running && state.modifiedTimer>0){
                state.modifiedTimer--
            }
            
        },
        modified(state){
            const [minute,second] = (state.timer || '00:00').split(':').map(str => parseInt(str, 10));
            const isValidTime = !isNaN(minute) && !isNaN(minute);
            const totalMinutes = isValidTime ? minute*60 + second : 0;
            state.modifiedTimer = totalMinutes
        },
        stopTimer(state){
            state.running=false
        },
        startTimer(state){
            state.running=true
        }
    }
})

export const timerActions = timerSlice.actions;
export default timerSlice.reducer;