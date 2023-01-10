import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Product } from "../../app/models/product";


interface Props{
    product:Product
}

export  default function ProductCard({product}:Props){
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
        <Button size="small">Add to Cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
    )
}