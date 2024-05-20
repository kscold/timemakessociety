import { createSlice } from "@reduxjs/toolkit"

const initialIsGoToSimilarState = {
    isGoToSimilarState:false,
}

const isGoToSimilarSlice = createSlice({
    name:'isGoToSimilar',
    initialState:initialIsGoToSimilarState,
    reducers:{
        toggle(state,action){
            state.isGoToSimilarState=action.payload;
        }
    }
})

export const isGoToSimilarAction = isGoToSimilarSlice.actions
export default isGoToSimilarSlice.reducer