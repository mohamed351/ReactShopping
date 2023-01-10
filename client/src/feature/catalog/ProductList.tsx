import { Grid, List } from "@mui/material"
import { Product } from "../../app/models/product"
import ProductCard from "./ProductCard"

interface Props{
    products:Product[]
}

export default function ProductList({products}:Props){
  return (  <Grid container spacing={4}>
    {products.map(opt =>{
       return( <Grid item xs={4} key={opt.id}>
        <ProductCard product={opt}></ProductCard>
        </Grid>)
    })}
    </Grid>)
}