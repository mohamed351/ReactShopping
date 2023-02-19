import { createSlice } from "@reduxjs/toolkit";
export interface CounterState{
    data:number;
}

const initialState:CounterState ={
    data:42
} 
export const counterSlice = createSlice({
    name:"counter",
    initialState,
    reducers:{
        increment:(state,action)=>{
            state.data +=1;
        },
        decrement:(state,action)=>{
            state.data -=1
        }
    }
})

export const {decrement,increment} = counterSlice.actions;