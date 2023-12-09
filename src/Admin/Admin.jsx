import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';


const Admin = () => {
    const [newProduct, setNewProduct] = useState({ name: '', category: '', price: 0, image: '' });
    const { addProduct, updateProduct, deleteProduct } = useContext(ShopContext);
    const { solicitudes, aceptarSolicitud, rechazarSolicitud } = useContext(ShopContext);

    const handleInputChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    // Añadir lógica para manejar onSubmit para agregar, actualizar y eliminar productos

    return (
        <div>
            <h1>HOLA MUNDO</h1>
            {solicitudes.map(solicitud => (
                <div key={solicitud._id}>
                    <p>{solicitud.producto.nombre}</p>
                    {/* Botones o acciones para aceptar/rechazar */}
                    <button onClick={() => aceptarSolicitud(solicitud._id)}>Aceptar</button>
                    {/* Botón similar para rechazar */}
                    <button onClick={() => rechazarSolicitud(solicitud._id)}>Rechazar</button>
                </div>
            ))}
        </div>
    );
};

export default Admin;