import React, { useContext } from 'react'
import Breadcrums from '../Components/Breadcrums/Breadcrums'
import PaginaProducto from '../Components/PaginaProducto/PaginaProducto'
import DescriptionBox from '../Components/Descripcion/Descripcion.css'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

const Product = () => {
    const {products} = useContext(ShopContext);
    const {productId} = useParams();
    const product = products.find((e)=>e.id === productId);
    return (
        <div>
            <Breadcrums product={product}/>
            <PaginaProducto product={product}/>
            <DescriptionBox/>
            <RelatedProducts/>
        </div>
    )
}

export default Product
