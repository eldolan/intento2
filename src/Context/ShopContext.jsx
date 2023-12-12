import React, { createContext, useEffect, useState } from "react";
import all_product from '../Components/Assets/all_product';
import axios from "axios";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    return cart;
};

/*const formatDate = (date) => {
    const d = new Date(date),
        day = '' + d.getDate(),
        month = '' + (d.getMonth() + 1),
        year = d.getFullYear();

    return [day.padStart(2, '0'), month.padStart(2, '0'), year].join('/');
};*/

const ShopContextProvider = (props) => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [products, setProducts] = useState(all_product);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);


    useEffect(() => {
        const checkAuth = () => {
            const userId = localStorage.getItem('userId');
            setIsUserAuthenticated(!!userId);
        };
        checkAuth();
        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);


    useEffect(() => {
        fetchUserProfile();
        fetchProducts();
        fetchSolicitudes();
    }, []);

    useEffect(() => {
        console.log("Estado del carrito ha sido actualizado:", cartItems);
    }, [cartItems]);

    const fetchUserProfile = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('No hay usuario autenticado');
            }

            const response = await axios.get(`http://localhost:4000/perfil?userId=${userId}`, {
                withCredentials: true,
            });

            setUserProfile(response.data);
        } catch (error) {
            console.error("Error en fetchUserProfile:", error.response.data);
        }
    };

    const updateProfile = async (userId, newEmail, newPassword, currentPassword, updatedData) => {
        try {
            const response = await fetch('http://localhost:4000/perfil/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, newEmail, newPassword, currentPassword, updatedData })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error al actualizar el perfil');
            }
            setUserProfile(data.user);
        } catch (error) {
            console.error("Error en updateProfile:", error);
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

    const fetchCartItems = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        try {
            const response = await axios.get(`http://localhost:4000/getcart/${userId}`);
            if (response.data) {
                // Convertir el objeto a la estructura esperada
                const newCartItems = {};
                for (const [key, value] of Object.entries(response.data)) {
                    newCartItems[key] = { quantity: value };
                }
                setCartItems(newCartItems);
            }
        } catch (error) {
            console.error("Error al obtener los datos del carrito:", error);
        }
    };

    const aceptarSolicitud = async (solicitudId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/solicitudes/${solicitudId}/aceptar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                console.log("Solicitud aceptada");
                fetchSolicitudes();
            } else {
                console.error("Error al aceptar solicitud");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };
    const rechazarSolicitud = async (solicitudId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/solicitudes/${solicitudId}/rechazar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                console.log("Solicitud rechazada");
                fetchSolicitudes();
            } else {
                console.error("Error al rechazar solicitud");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    const addToCart = async (itemId, option, startDate) => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.post('http://localhost:4000/addtocart', {
                userId,
                itemId,
                quantity: 1,
                option,
                startDate
            });
            console.log(response.data);
            if (response.data) {
                await fetchCartItems();
            }
        } catch (error) {
            console.error("Error al añadir al carrito:", error);
        }
    };

    const removeFromCart = async (itemId) => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.post('http://localhost:4000/removefromcart', { userId, itemId });
            if (response.data) {
            }
        } catch (error) {
            console.error("Error al eliminar del carrito:", error);
        }
    };
    const updateCartQuantity = async (itemId, newQuantity) => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.post('http://localhost:4000/updatecartquantity', {
                userId,
                itemId,
                quantity: newQuantity
            });
            if (response.data) {
            }
        } catch (error) {
            console.error("Error al actualizar la cantidad en el carrito:", error);
        }
    };

    const fetchSolicitudes = async (userId) => {
        try {
            const respuesta = await fetch(`http://localhost:4000/api/solicitudes/usuario/${userId}`, {
                credentials: 'include',
            });
            if (!respuesta.ok) {
                const body = await respuesta.text();
                console.error('Respuesta no exitosa:', body);
                throw new Error('Error al cargar las solicitudes');
            }
            const data = await respuesta.json();
            setSolicitudes(data);
        } catch (error) {
            console.error("Error al cargar solicitudes:", error);
        }
    };


    const addProduct = async (newProduct) => {
        try {
            const response = await axios.post('http://localhost:4000/addproduct', newProduct);
            if (response.data) {
                await fetchProducts(); // Actualizar la lista de productos después de agregar uno nuevo
            }
        } catch (error) {
            console.error("Error al añadir producto:", error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`http://localhost:4000/deleteproduct/${productId}`);
            if (response.data) {
                await fetchProducts(); // Actualizar la lista de productos después de eliminar uno
            }
        } catch (error) {
            console.error("Error al eliminar producto:", error);
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
        fetchSolicitudes,
        solicitudes,
        isUserAuthenticated,
        setIsUserAuthenticated,
        updateProfile,
        aceptarSolicitud,
        rechazarSolicitud,
        addProduct,
        deleteProduct
    };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;