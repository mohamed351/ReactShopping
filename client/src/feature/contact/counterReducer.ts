export const INCREMENT ="INCREMENT";
export const DECREMENT = "DECREMENT";
export interface CounterState{
    data:number;
}

const initialState:CounterState ={
    data:42
} 
export default function counterReducer(state = initialState, action:any){
    switch(action.type){
        case INCREMENT:
            return {
                ...state,
                data:state.data +1
            }
        case DECREMENT:
            return {
            ...state,
            data:state.data -1
        }

        default:
            return state;
    }
    
}