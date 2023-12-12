import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Components/Navbar/Navbar";
import './Components/Navbar/Navbar.css';
import{BrowserRouter,Routes,Route} from "react-router-dom";
import Admin from './Admin/Admin'
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import Perfil from "./Components/Perfil/Perfil";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import banner_libros from './Components/Assets/banner_libros.png'
import banner_multimedia from './Components/Assets/banner_multimedia.png'


function App() {
    return (
        <div>
            <BrowserRouter>
                <Navbar/>

                <Routes>
                    <Route path='/' element={<Shop/>}/>
                    <Route path='/libros' element={<ShopCategory banner={banner_libros} category="libros"/>}/>
                    <Route path='/multimedia' element={<ShopCategory banner={banner_multimedia} category="multimedia"/>}/>
                    <Route path='/perfil' element={<ProtectedRoute><Perfil/></ProtectedRoute>}/>
                    <Route path="/product" element={<Product/>}>
                        <Route path='/product/:id' element={<Product/>}/>
                    </Route>
                    <Route path="/admin" element={
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute>
                    }/>
                    <Route path='/carrito' element={<Cart/>}/>
                    <Route path='/login' element={<LoginSignup/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                </Routes>

                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
