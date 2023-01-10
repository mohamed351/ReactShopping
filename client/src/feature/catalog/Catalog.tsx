import { Product } from "../../app/models/product"
import ProductList from "./ProductList"

interface Props{
      products:Product[]
}
export default function Catalog(props:Props){
      return (
            <>
      <h1>Catalog</h1>

            <ProductList products={props.products} />
  
    
      </>
      )
}