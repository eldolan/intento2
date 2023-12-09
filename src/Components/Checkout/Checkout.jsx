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

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setUserInfo(prevInfo => ({
                ...prevInfo,
                name: user.name || '',
                rut: user.rut || '',
                email: user.email || '',
                region: user.region || '',
                comuna: user.comuna || '',
                calle: user.calle || '',
                telefono: user.telefono || ''
            }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Información del usuario para el checkout:', userInfo);
        navigate('/confirmation');
    };

    return (
        <div className="checkout-container">
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
    );
};

export default CheckoutPage;
