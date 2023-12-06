import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Components/Navbar/Navbar";
import './Components/Navbar/Navbar.css';
import{BrowserRouter,Routes,Route} from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'


function App() {
  return (
    <div>
        <BrowserRouter>
            {/*Navbar Global*/}
            <Navbar/>
            {/*Conexion entre las paginas*/}
            <Routes>
                <Route path='/' element={<Shop/>}/>
                <Route path='/libros' element={<ShopCategory banner={men_banner} category="libros"/>}/>
                <Route path='/multimedia' element={<ShopCategory banner={women_banner} category="multimedia"/>}/>
                <Route path='/perfil' element={<ShopCategory banner={kid_banner} category="perfil"/>}/>
                <Route path="/product" element={<Product/>}>
                    <Route path='productId' element={<Product/>}/>
                </Route>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<LoginSignup/>}/>
            </Routes>
            {/*Footer Global*/}
            <Footer/>
        </BrowserRouter>


    </div>
  );
}

export default App;
