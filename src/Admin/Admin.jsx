import React, { useState, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import './Admin.css';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('solicitudes');
    const [newProduct, setNewProduct] = useState({ name: '', category: '', price: 0, image: '' });
    const { solicitudes, aceptarSolicitud, rechazarSolicitud, addProduct, deleteProduct } = useContext(ShopContext);
    const [deleteProductData, setDeleteProductData] = useState('');

    const handleAceptarSolicitud = (id) => {
        aceptarSolicitud(id);
        alert('Solicitud Aceptada');
    };

    const handleRechazarSolicitud = (id) => {
        rechazarSolicitud(id);
        alert('Solicitud Rechazada');
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleInputChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleAddProduct = () => {
        addProduct(newProduct);
        setNewProduct({ name: '', category: '', price: 0, image: '' });
    };

    const handleDeleteProduct = () => {
        deleteProduct(deleteProductData);
        setDeleteProductData('');
    };

    return (
        <div className="container mt-5 " style={{ height: '70.5vh' }}>
            <div className="row justify-content-center">
                <div className="col-lg-10 col-md-12">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h1 className="text-center card-title">Panel de Administración</h1>

                            <div className="d-flex justify-content-around mb-4">
                                <button
                                    className={`btn ${activeTab === 'solicitudes' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setActiveTab('solicitudes')}
                                >
                                    Solicitudes
                                </button>
                                <button
                                    className={`btn ${activeTab === 'addProduct' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setActiveTab('addProduct')}
                                >
                                    Agregar Producto
                                </button>
                                <button
                                    className={`btn ${activeTab === 'deleteProduct' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setActiveTab('deleteProduct')}
                                >
                                    Eliminar Producto
                                </button>
                            </div>

                            <div className="add-product-form">
                                <h2>Agregar Nuevo Producto</h2>
                                <div className="mb-3">
                                    <label htmlFor="productName" className="form-label">Nombre del Producto</label>
                                    <input type="text" className="form-control" id="productName" name="name"
                                           value={newProduct.name}
                                           onChange={handleInputChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productCategory" className="form-label">Categoría</label>
                                    <input type="text" className="form-control" id="productCategory" name="category"
                                           value={newProduct.category} onChange={handleInputChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productPrice" className="form-label">Precio</label>
                                    <input type="number" className="form-control" id="productPrice" name="price"
                                           value={newProduct.price} onChange={handleInputChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productImage" className="form-label">URL de la Imagen</label>
                    <input type="text" className="form-control" id="productImage" name="image" value={newProduct.image}
                           onChange={handleInputChange}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleAddProduct}>Agregar Producto</button>
            </div>

            {activeTab === 'deleteProduct' && (
                <div className="delete-product-form">
                    <h2>Eliminar Producto</h2>
                    <div className="mb-3">
                        <label htmlFor="deleteProductInput" className="form-label">ID o Nombre del Producto</label>
                        <input type="text" className="form-control" id="deleteProductInput" value={deleteProductData}
                               onChange={(e) => setDeleteProductData(e.target.value)}/>
                    </div>
                    <button type="button" className="btn btn-danger" onClick={handleDeleteProduct}>Eliminar Producto
                    </button>
                </div>
            )}


            <div className="solicitudes-list">
                <h2>Solicitudes Pendientes</h2>
                {solicitudes.map(solicitud => (
                    <div key={solicitud._id} className="solicitud-item">
                        <p>{solicitud.producto?.nombre ?? 'Nombre no disponible'}</p>
                        <button className="btn btn-success"
                                onClick={() => handleAceptarSolicitud(solicitud._id)}>Aceptar
                        </button>
                        <button className="btn btn-danger"
                                onClick={() => handleRechazarSolicitud(solicitud._id)}>Rechazar
                        </button>
                    </div>
                ))}
            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;