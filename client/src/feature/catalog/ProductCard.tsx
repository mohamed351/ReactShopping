import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia,  Typography } from "@mui/material";
import {LoadingButton} from '@mui/lab';
import { grey } from "@mui/material/colors";
import { Product } from "../../app/models/product";
import {Link} from 'react-router-dom';
import { useState } from "react";
import agent from "../../app/api/agent";


interface Props{
    product:Product
}

export  default function ProductCard({product}:Props){
  const [loading, setIsLoading] =useState(false);
  const handleAddItem =()=>{
    setIsLoading(true)
    agent.Basket.addItem(product.id)
    .catch(a=> console.log(a))
    .finally(()=> setIsLoading(false));
  }
    return (
        <Card sx={{ maxWidth: 345  }}>
            <CardHeader avatar={<Avatar sx={{ bgcolor: grey }}> {product.name.charAt(0).toUpperCase()} </Avatar>}
             title={product.name}
             titleTypographyProps>
         
            </CardHeader>
      <CardMedia
        sx={{ height: 140 , backgroundSize:"contain"}}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="purple">
        $  {product.price} 
        </Typography>
        <Typography variant="body2" color="text.secondary">
           {product.brand} /{product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton size="small" loading={loading} onClick={handleAddItem}>Add to Cart</LoadingButton>
        <Button size="small" component={Link}  to={`/catalog/${product.id}`} >
            View
            </Button>
      </CardActions>
    </Card>
    )
}