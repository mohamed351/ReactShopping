import { useEffect, useState } from "react"
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList"


export default function Catalog(){
   const [products,setProduct] = useState<Product[]>([]);
   useEffect(()=>{
            agent.Catalog.list().then(currentProducts=> setProduct(currentProducts)).catch(a=> console.log(a));
            },[]);
      return (
            <>
              <h1>Catalog</h1>
            <ProductList products={products} />
  
    
      </>
      )
}