import { Button } from "@mui/material";
import {useAppDispatch, useAppSelector} from '../../app/store/configureStore';
import {decrement, increment} from '../contact/counterReducer';

export default function ContactPage(){
     const counterSelector = useAppSelector(state => state.counter);
     const dispatch = useAppDispatch()
    return (<>
    <h2>Contact Page</h2>
        {counterSelector.data}
        <Button onClick={()=> dispatch(increment({}))}> +</Button>
        <Button onClick={()=> dispatch(decrement({}))}> -</Button>
    </>)
}