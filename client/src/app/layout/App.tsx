import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import {useState, useEffect} from 'react';
import Catalog from '../../feature/catalog/Catalog';
import { Product } from '../models/product';
import Header from './Header';
import './style.css';
import {Routes, Route , BrowserRouter} from 'react-router-dom';
import HomePage from '../../feature/home/HomePage';
import AboutPage from '../../feature/about/AbountPage';
import ProductDetails from '../../feature/catalog/ProductDetails';
import agent from '../api/agent';
import BasketPage from '../../feature/basket/BasketPage';

function App() {

  const [products,setProduct] = useState<Product[]>([]);
  const [darkMode,setDarkMode] = useState(false);
  
  useEffect(()=>{
  agent.Catalog.list().then(currentProducts=> setProduct(currentProducts)).catch(a=> console.log(a));
  },[]);

  const theme = createTheme({
    palette:{
      mode:darkMode? "dark":"light"
    }
  })



  return (
   <ThemeProvider theme={theme}>
   <CssBaseline />
   <BrowserRouter>
   <Header idDarkMode={darkMode} onThemeChange={()=>  setDarkMode((prevState)=> !prevState)}/>
   <Container>

   <Routes>
        <Route path='/' element={ <HomePage />} />
        <Route path='/about' element={ <AboutPage />} />
        <Route path='/catalog' element={ <Catalog products={products} />} />
        <Route path="/catalog/:id" element={<ProductDetails/>} />
        <Route path='/basket' element={<BasketPage/>}/>
   </Routes>
 
   </Container>
   </BrowserRouter>
   </ThemeProvider>
  );
}

export default App;
