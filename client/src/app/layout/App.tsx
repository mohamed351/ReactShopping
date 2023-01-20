import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import {useState, useEffect} from 'react';
import Catalog from '../../feature/catalog/Catalog';
import Header from './Header';
import './style.css';
import {Routes, Route , BrowserRouter} from 'react-router-dom';
import HomePage from '../../feature/home/HomePage';
import AboutPage from '../../feature/about/AbountPage';
import ProductDetails from '../../feature/catalog/ProductDetails';
import agent from '../api/agent';
import BasketPage from '../../feature/basket/BasketPage';
import { useStoreContext } from '../context/StoreContext';
import { getCookie } from '../utility/utill';

function App() {

   const {setBasket} = useStoreContext(); 
  const [darkMode,setDarkMode] = useState(false);
  
  const theme = createTheme({
    palette:{
      mode:darkMode? "dark":"light"
    }
  })
  useEffect(()=>{
    if(getCookie("buyerId")){
    agent.Basket.get().then(data => setBasket(data));
    }
  },[setBasket])


  return (
   <ThemeProvider theme={theme}>
   <CssBaseline />
   <BrowserRouter>
   <Header idDarkMode={darkMode} onThemeChange={()=>  setDarkMode((prevState)=> !prevState)}/>
   <Container>

   <Routes>
        <Route path='/' element={ <HomePage />} />
        <Route path='/about' element={ <AboutPage />} />
        <Route path='/catalog' element={ <Catalog />} />
        <Route path="/catalog/:id" element={<ProductDetails/>} />
        <Route path='/basket' element={<BasketPage/>}/>
   </Routes>
 
   </Container>
   </BrowserRouter>
   </ThemeProvider>
  );
}

export default App;
