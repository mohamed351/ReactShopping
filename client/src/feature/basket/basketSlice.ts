import { createSlice } from '@reduxjs/toolkit';
import {BasketData} from '../../app/models/basketData';
import { BasketItem } from '../../app/models/basketItem';
import {createAsyncThunk} from '@reduxjs/toolkit';
import agent from '../../app/api/agent';

interface BasketState{
    basket:BasketData | null |any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

export const createBasketItemAsync = createAsyncThunk<BasketData,{productId:number, quantity:number}>("basket/additem",async({productId, quantity})=>{
        try{
                return await agent.Basket.addItem(productId,quantity);
        }catch(error){
            console.log(error);
        }
})

const initialState:BasketState ={
    basket :null,
    loading:"idle"
}

export const basketSlice = createSlice({
    name:"basket",
    initialState,
    reducers:{
        setBasket :(state,action)=>{
        state.basket = action.payload;
        },
        removeItem:(state,action)=>{
            const {productId, quantity} = action.payload;
            console.log(productId);
            const  newState =  state.basket?.items.map((item:any) => item.productId === productId ? {...item ,quantity: item.quantity-=quantity}  : item);
            console.log(newState);
            const filtered  = newState?.filter((a:any)=>a.quantity !== 0);
            console.log(filtered);
            state.basket.items = filtered
        
        }    
    },
    extraReducers:(builder)=>{
      builder.addCase(createBasketItemAsync.pending,(state)=>{
        state.loading ="pending";
      }).addCase(createBasketItemAsync.fulfilled,(state, action)=>{
            state.basket = action.payload;
            state.loading = "idle";
      }).addCase(createBasketItemAsync.rejected,(state,action)=>{
           state.loading = "failed";
      })

    }
})

export const {setBasket, removeItem} = basketSlice.actions;