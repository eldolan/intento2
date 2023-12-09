import React, { useState, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';


const Admin = () => {
    const [newProduct, setNewProduct] = useState({ name: '', category: '', price: 0, image: '' });
    const { addProduct, updateProduct, deleteProduct } = useContext(ShopContext);

    const handleInputChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    // Añadir lógica para manejar onSubmit para agregar, actualizar y eliminar productos

    return (
        <div>
            {/* Formulario para agregar nuevos productos */}
            {/* Formulario para editar productos existentes */}
            {/* Opción para eliminar productos */}
        </div>
    );
};

export default Admin;