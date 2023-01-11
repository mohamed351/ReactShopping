import { useParams } from "react-router-dom"
import {useEffect,useState} from 'react';
import axios from 'axios';
import { Product } from "../../app/models/product";
import { Grid, Table, TableBody, TableCell, TableRow } from "@mui/material";
export default function ProductDetails(){
    const {id} = useParams();
    const [product,setProduct] = useState<Product>();
    const [loading,setIsLoading] = useState(true);
    useEffect(()=>{
        axios.get(`https://localhost:44340/api/Products/${id}`)
        .then(a=>setProduct(a.data))
        .catch(a=> console.log(a))
        .finally(()=>setIsLoading(false))
    },[id]);

    if(loading){
        return <p> loading ..</p>
    }
    
    if(!product){
        return <h2>Product Not Found</h2>
    }


    return (<Grid container spacing={6}>
        <Grid item xs={6}>
         
            <img src={product.pictureUrl} width={"100%"} />
        </Grid>
        <Grid item xs={6}>
        <h2>{product.name}</h2>
        <h3 style={{color:"purple"}}>{product.price} $</h3>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            {product.name}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Description
                        </TableCell>
                        <TableCell>
                            {product.description}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            Type
                        </TableCell>
                        <TableCell>
                            {product.type}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            Brand
                        </TableCell>
                        <TableCell>
                            {product.brand}
                        </TableCell>
                    </TableRow>


                    <TableRow>
                        <TableCell>
                            Quantity in Stock
                        </TableCell>
                        <TableCell>
                            {product.quantityInStock}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Grid>
       

    </Grid>)
}