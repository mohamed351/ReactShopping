import { ShoppingCart } from "@mui/icons-material";
import { AppBar, ListItem, List, Switch, Toolbar , Typography, IconButton, Badge } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

interface Props{
    idDarkMode:boolean,
    onThemeChange:()=> void
}

export default function Header({idDarkMode,onThemeChange}:Props){
    return (
        <AppBar position="static" style={{display:"flex",flexDirection:"row" ,justifyContent:"space-around"}}>
            <Toolbar>
                <Typography variant="h5"> React Store</Typography>
                <Switch checked={idDarkMode} onChange={onThemeChange} />
            </Toolbar>

            <List style={{display:"flex",flexDirection:"row",justifyContent:"start"}}>
                <ListItem>
                   <NavLink to="/" style={{textDecoration:"none", color:"white"}}>Home</NavLink>
                </ListItem>
                <ListItem>
                <NavLink to="/about" style={{textDecoration:"none", color:"white"}}>About</NavLink>
                </ListItem>
                <ListItem>
                <NavLink to="/catalog" style={{textDecoration:"none", color:"white"}}>Catalog</NavLink>
                </ListItem>
            </List> 


            <List style={{display:"flex",flexDirection:"row",justifyContent:"end"}}>

           
            <ListItem>
             <NavLink  to="/"  style={{textDecoration:"none", color:"white"}}> Login</NavLink>        
               
            </ListItem>
            <ListItem>
            <NavLink to="/register"  style={{textDecoration:"none", color:"white"}}> Register</NavLink>
            </ListItem>

            <ListItem>
              <IconButton style={{color:"white"}}>
                <Badge badgeContent={4}>
                    <ShoppingCart />
                </Badge>
              </IconButton>
            </ListItem>
            </List>
        </AppBar>
    )
}