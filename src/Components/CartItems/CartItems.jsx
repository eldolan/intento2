import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CartItems.css'
import {Button} from "react-bootstrap";

const CartItems = () => {
    const { getTotalCartAmount, products, cartItems, removeFromCart, updateCartQuantity } = useContext(ShopContext);

    const handleCheckout = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert("Por favor, inicia sesión para continuar");
            return;
        }

        const orderData = {
            userId: userId,
            cartItems: cartItems,
            totalAmount: getTotalCartAmount()
        };

        try {
            const response = await fetch('http://localhost:4000/api/crear-solicitud', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {

                alert("Pedido creado con éxito");
            } else {
                alert("Error al crear el pedido");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    return (
        <div className="carrito-container">
            <div className="container mb-5">
                <div className="row pt-4 mb-3">
                    <div className="col-3"><strong>Productos</strong></div>
                    <div className="col"><strong>Nombre</strong></div>
                    <div className="col"><strong>Precio</strong></div>
                    <div className="col"><strong>Cantidad</strong></div>
                    <div className="col"><strong>Total</strong></div>
                    <div className="col"><strong>Eliminar</strong></div>
                </div>
                <hr/>

                {products.map((e) => {
                    const item = cartItems[e.id];
                    if (item && item.quantity > 0) {
                        return (
                            <div key={e.id} className="row align-items-center mb-3 border-bottom pb-3">
                                <div className="col-3">
                                    <img src={e.image} alt={e.name} className='img-fluid' style={{width: 96}}/>
                                </div>
                                <div className="col">{e.name}</div>
                                <div className="col">${e.new_price}</div>
                                <div className="col">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        className="form-control"
                                        onChange={(e) => updateCartQuantity(e.id, parseInt(e.target.value))}
                                    />
                                </div>
                                <div className="col">${e.new_price * item.quantity}</div>
                                <div className="col">
                                    <button onClick={() => removeFromCart(e.id)}
                                            className="btn btn-link text-danger p-0 border-0 bg-transparent">
                                        <img src={remove_icon} alt="Remove" className='img-fluid'
                                             style={{width: '20px'}}/>
                                    </button>
                                </div>
                                {item.option === "Arriendo" && (
                                    <p className="col-12">Arriendo hasta: {item.returnDate}</p>
                                )}
                            </div>
                        );
                    }
                    return null;
                })}
                <div className="row justify-content-end">
                    <div className="col-md-4">
                        <h3 className="text-uppercase mt-5 mb-3">Total</h3>
                        <div className="d-flex justify-content-between mb-1">
                            <span>Subtotal</span>
                            <span>${getTotalCartAmount()}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                            <span>Envío</span>
                            <span>Gratis</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                            <span><strong>Total</strong></span>
                            <span><strong>${getTotalCartAmount()}</strong></span>
                        </div>
                        <Button onClick={handleCheckout} className="btn btn-danger btn-lg w-100 mt-3">Proceder al pago</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
