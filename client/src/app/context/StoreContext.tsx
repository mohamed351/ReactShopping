import { BasketData } from "../models/basketData";
import {createContext, PropsWithChildren, useContext, useState} from "react";

export interface StoreContextValue{
    basket:BasketData | null,
    setBasket:(basket:BasketData) => void,
    removeBasket:(productId:number,quantity:number)=> void
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext(){
    const context = useContext(StoreContext);
    if(context === undefined){
        throw Error("Please make sure that you are inside the provider");
    }
    return context;
}



export function StoreProvider({children}:PropsWithChildren<any>){
    const [basket, setBasket] = useState<BasketData|null>(null);

        function removeBasket(productId:number , quantity:number){
            if(!basket) return ;
           setBasket((prevState:any)=>{
                let  state = {...prevState,items: prevState?.items.map((item:any) =>  (item.productId === productId ? {...item , quantity: item.quantity - quantity}:item ) ) }
                 state = {...state , items: state.items.filter((a:any)=> a.quantity !== 0)}
                 console.log()
                 return state;
           });

        }

        return (
            <StoreContext.Provider value={{basket, removeBasket , setBasket }}>
                {children}
            </StoreContext.Provider>
        )
}