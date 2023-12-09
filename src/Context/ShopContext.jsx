import React, { createContext, useEffect, useState } from "react";
import all_product from '../Components/Assets/all_product';
export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    return cart;
};

const formatDate = (date) => {
    const d = new Date(date),
        day = '' + d.getDate(),
        month = '' + (d.getMonth() + 1),
        year = d.getFullYear();

    return [day.padStart(2, '0'), month.padStart(2, '0'), year].join('/');
};

const ShopContextProvider = (props) => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [products, setProducts] = useState(all_product);
    console.log("Productos iniciales:", all_product);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetchUserProfile(token);
            fetchProducts();
            fetchSolicitudes(token);
        }
    }, []);

    const fetchUserProfile = async () => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            console.error("Token no encontrado");
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/perfil', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar el perfil del usuario.');
            }

            const data = await response.json();
            setUserProfile(data);
        } catch (error) {
            console.error("Error en fetchUserProfile:", error);
        }
    };


    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:4000/productos');
            const data = await response.json();
            if (data && data.length > 0) {
                setProducts(data);
            }
        } catch (error) {
            console.error('Error al cargar productos desde la API:', error);
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const item = cartItems[itemId];
            const productInfo = products.find(product => product.id === Number(itemId));
            if (productInfo) {
                totalAmount += item.quantity * productInfo.new_price;
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];;
            }
        }
        return totalItem;
    };

    const addToCart = (itemId, option = 'Compra', startDate = null) => {
        setCartItems(prev => {
            const itemExists = prev[itemId];
            let returnDate = null;

            if (option === 'Arriendo' && startDate) {
                const returnDateObj = new Date(startDate);
                returnDateObj.setDate(returnDateObj.getDate() + 7);
                returnDate = formatDate(returnDateObj);
            }

            if (itemExists) {
                return { ...prev, [itemId]: { ...itemExists, quantity: itemExists.quantity + 1, option, startDate, returnDate } };
            } else {
                return { ...prev, [itemId]: { quantity: 1, option, startDate, returnDate } };
            }
        });
        if(localStorage.getItem("auth-token")) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem("auth-token")}`,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({"itemId": itemId}),
            })
                .then((resp) => resp.json())
                .then((data) => { console.log(data); });
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems(prev => {
            const itemExists = prev[itemId];
            if (itemExists && itemExists.quantity > 1) {
                return { ...prev, [itemId]: { ...itemExists, quantity: itemExists.quantity - 1 } };
            } else {
                const updatedCart = { ...prev };
                delete updatedCart[itemId];
                return updatedCart;
            }
        });
        if(localStorage.getItem("auth-token")) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem("auth-token")}`,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({"itemId": itemId}),
            })
                .then((resp) => resp.json())
                .then((data) => { console.log(data); });
        }
    };
    const updateCartQuantity = (newQuantity, itemId) => {
        setCartItems(prev => {
            const itemExists = prev[itemId];
            if (itemExists) {
                return { ...prev, [itemId]: { ...itemExists, quantity: Math.max(newQuantity, 0) } };
            }
            return prev;
        });
        if(localStorage.getItem("auth-token")) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem("auth-token")}`,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({"itemId": itemId}),
            })
                .then((resp) => resp.json())
                .then((data) => { console.log(data); });
        }
    };

    const fetchSolicitudes = async (token) => {
        try {
            const respuesta = await fetch('/api/solicitudes', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!respuesta.ok) {
                throw new Error('Error al cargar las solicitudes');
            }
            const data = await respuesta.json();
            setSolicitudes(data);
        } catch (error) {
            console.error("Error al cargar solicitudes:", error);
        }
    };



        const contextValue = {
            products,
            getTotalCartItems,
            cartItems,
            addToCart,
            removeFromCart,
            getTotalCartAmount,
            updateCartQuantity,
            userProfile,
            fetchUserProfile,
            solicitudes
    };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;