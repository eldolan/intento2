import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import './CSS/Product.css'
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import PaginaProducto from '../Components/PaginaProducto/PaginaProducto';
import Descripcion from '../Components/Descripcion/Descripcion';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
    const { id } = useParams();
    console.log("ID del producto desde URL:", id);
    const { products } = useContext(ShopContext);
    console.log("Productos disponibles:", products);
    const product = products.find((product) => product.id === parseInt(id, 10));
    console.log("Producto encontrado:", product);
    if (!product) {
        console.log("Producto no encontrado para el ID:", id);
        return <div>Producto no encontrado</div>;
    }

    return (
        <div className="product">
            <Breadcrums product={product}/>
            <PaginaProducto product={product}/>
            <Descripcion/>
            <RelatedProducts/>
        </div>
    );
};

export default Product;