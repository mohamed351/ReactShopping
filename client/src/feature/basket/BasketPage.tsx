import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import agent from "../../app/api/agent";


export default function BasketPage(){
  const {basket,removeBasket} =  useStoreContext();
  const handleCartDeletion =(productId:number, quantity:number)=>{
    agent.Basket.removeItem(productId,quantity).then(()=> removeBasket(productId,quantity))
    .catch(a=> console.log(a));
  }
    return (<>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {basket?.items.map(item =>
                    (<TableRow key={item.productId}>
                        <TableCell>
                            {item.name}
                        </TableCell>
                        <TableCell>
                            {item.price} $
                        </TableCell>
                        <TableCell>
                            {item.quantity}
                        </TableCell>
                        <TableCell>
                            {item.price * item.quantity} $
                        </TableCell>
                        <TableCell>
                            <IconButton color="error" onClick={()=> handleCartDeletion(item.productId, item.quantity)} >
                                <Delete />
                            </IconButton>
                        </TableCell>
                    </TableRow>)
                )}
            </TableBody>
        </Table>
    </>)
}