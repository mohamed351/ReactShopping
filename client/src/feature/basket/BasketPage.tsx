import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import agent from "../../app/api/agent";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { BasketData } from "../../app/models/basketData";
import BasketSummary from "./BasketSummary";


export default function BasketPage(){
  const {basket,removeBasket,setBasket} =  useStoreContext();
  const [getloadingState, setLoadingState] = useState({
    isloading:false,
    name:""
  });
  
  const handleCartDeletion =(productId:number, quantity:number, name:string)=>{
    setLoadingState({isloading:true , name})
    agent.Basket.removeItem(productId,quantity)
    .then(()=> removeBasket(productId,quantity))
    .catch(a=> console.log(a))
    .finally(()=>setLoadingState({isloading:false , name}));
  }

  const addingCart = (productId:number,quantity:number, name:string ) =>{
    setLoadingState({isloading:true , name})
    agent.Basket.addItem(productId,quantity)
    .then((a:BasketData)=> setBasket(a))
    .catch(a=> console.log(a))
    .finally(()=> setLoadingState({isloading:false , name}))
  }
    return (<>
        <TableContainer style={{marginTop:25}}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {basket?.items.map(item =>
                    (
                
                    <TableRow key={item.productId}>
                        <TableCell>
                            <div style={{display:"flex",alignItems:"center"}}>
                            <img src={item.pictureUrl} alt={item.name} style={{height:50, marginRight:10}}  />
                                {item.name}
                            
                            </div>

                        </TableCell>
                        <TableCell>
                            {item.price} $
                        </TableCell>
                        <TableCell align="center">
                             <LoadingButton 
                             loading={getloadingState.name === "rem" +item.productId && getloadingState.isloading } 
                             color="error"
                             onClick={()=> handleCartDeletion(item.productId,1,"rem" +item.productId)} >
                                <Remove />
                            </LoadingButton>
                            {item.quantity}
                            <LoadingButton   loading={getloadingState.name === "add" +item.productId && getloadingState.isloading } 
                             color="primary"
                             onClick={()=> addingCart(item.productId,1,"add" +item.productId)}>
                                <Add />
                            </LoadingButton>
                           
                        </TableCell>
                        <TableCell>
                            {item.price * item.quantity} $
                        </TableCell>
                        <TableCell>
                            <LoadingButton  loading={getloadingState.name === "del" +item.productId && getloadingState.isloading } color="error" onClick={()=> handleCartDeletion(item.productId, item.quantity,"del"+item.productId)} >
                                <Delete />
                            </LoadingButton>
                        </TableCell>
                    </TableRow>)
                )}
            </TableBody>
        </Table>
        </TableContainer>

        <Grid container marginTop={5}>
            <Grid item xs={6}/>
            <Grid item xs={6}>
               <BasketSummary />
            </Grid>
            
        </Grid>
    
    </>)
}