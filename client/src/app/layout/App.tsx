import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import {useState, useEffect} from 'react';
import { json } from 'stream/consumers';
import Catalog from '../../feature/catalog/Catalog';
import { Product } from '../models/product';
import Header from './Header';
import './style.css';

function App() {

  const [products,setProduct] = useState<Product[]>([]);
  const [darkMode,setDarkMode] = useState(false);
  
  useEffect(()=>{
  fetch("https://localhost:44340/api/Products").then(a=>{
    return a.json()
  }).then(a=> setProduct(a))
  },[]);

  const theme = createTheme({
    palette:{
      mode:darkMode? "dark":"light"
    }
  })



  return (
   <ThemeProvider theme={theme}>
   <CssBaseline />
   <Header idDarkMode={darkMode} onThemeChange={()=>  setDarkMode((prevState)=> !prevState)}/>
   <Container>
   <Catalog products={products}/>
   </Container>
   </ThemeProvider>
  );
}

export default App;
