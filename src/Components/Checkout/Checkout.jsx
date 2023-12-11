import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const { cartItems, getTotalCartAmount, user } = useContext(ShopContext);
    const [userInfo, setUserInfo] = useState({
        name: '',
        rut: '',
        email: '',
        region: '',
        comuna: '',
        calle: '',
        telefono: ''
    });
    const [isOrderComplete, setIsOrderComplete] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setUserInfo({
                name: user.name || '',
                rut: user.rut || '',
                email: user.email || '',
                region: user.region || '',
                comuna: user.comuna || '',
                calle: user.calle || '',
                telefono: user.telefono || ''
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            userDetails: userInfo,
            cartItems: cartItems,
            totalAmount: getTotalCartAmount()
        };

        try {
            const response = await fetch('/api/crear-pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token') || ''
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                setIsOrderComplete(true);
                // Opcionalmente, aquí podrías también limpiar el carrito de compras
            } else {
                // Manejar errores, por ejemplo, mostrar un mensaje de error
            }
        } catch (error) {
            console.error("Error al enviar el pedido:", error);
        }
    };

    return (
        <div className="checkout-container">
            {isOrderComplete ? (
                <div>
                    <h2>Gracias por tu pedido</h2>
                    <p>Tu pedido ha sido procesado con éxito.</p>
                    <button onClick={() => navigate('/')}>Volver al inicio</button>
                </div>
            ) : (
                <div>
                    <h2>Checkout</h2>
                    {!user && (
                        <p>¿Tienes una cuenta? <a href="/login">Inicia sesión</a> o continúa como invitado.</p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={userInfo.name}
                            onChange={handleInputChange}
                            placeholder="Nombre y apellido"
                            required
                        />
                        <input
                            type="text"
                            name="email"
                            value={userInfo.email}
                            onChange={handleInputChange}
                            placeholder="Correo"
                            required
                        />
                        <input
                            type="number"
                            name="rut"
                            value={userInfo.rut}
                            onChange={handleInputChange}
                            placeholder="Rut"
                            required
                        />
                        <input
                            type="text"
                            name="region"
                            value={userInfo.region}
                            onChange={handleInputChange}
                            placeholder="Region"
                            required
                        />
                        <input
                            type="text"
                            name="comuna"
                            value={userInfo.comuna}
                            onChange={handleInputChange}
                            placeholder="Comuna"
                            required
                        />
                        <input
                            type="text"
                            name="calle"
                            value={userInfo.calle}
                            onChange={handleInputChange}
                            placeholder="Calle"
                            required
                        />
                        <input
                            type="tel"
                            name="telefono"
                            value={userInfo.telefono}
                            onChange={handleInputChange}
                            placeholder="Telefono"
                            required
                        />
                        <button type="submit" className="btn btn-primary">Finalizar Compra</button>
                    </form>
                </div>
            )}
        </div>
    );
};
export default CheckoutPage;

