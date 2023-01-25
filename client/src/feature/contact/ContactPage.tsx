import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CounterState, DECREMENT, INCREMENT } from "./counterReducer";

export default function ContactPage(){
   const {data} =  useSelector((state:CounterState)=> state);
   const dispatch = useDispatch();
    return (<>
    <h2>Contact Page</h2>
        {data}
        <Button onClick={()=> dispatch({type:INCREMENT})}> +</Button>
        <Button onClick={()=> dispatch({type:DECREMENT})}> -</Button>
    </>)
}