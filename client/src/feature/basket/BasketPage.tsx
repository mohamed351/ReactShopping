import {BasketData} from "../../app/models/basketData";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";


export default function BasketPage(){
    const [basket, setBasket] = useState<BasketData |null>(null);
    const [loading,setIsLoading] = useState(false);
    useEffect(()=>{
        setIsLoading(true);
        agent.Basket.get().then(data=> setBasket(data)).finally(()=> setIsLoading(false));
    },[]);

    if(loading){
        return <div>loading</div>
    }
    if(!basket){
        return <div>not found</div>
    }

    return (<div>
        <p>{basket?.buyerId}</p>
    </div>)
}