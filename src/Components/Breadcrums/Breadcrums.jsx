import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Breadcrums.css';


const Breadcrums = (props) => {
    const { product } = props;
    return (
        <nav aria-label="breadcrumb" className="my-4">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href="/shop">Shop</a></li>
                <li className="breadcrumb-item active" aria-current="page">{product.category}</li>
                <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
            </ol>
        </nav>
    );
}

export default Breadcrums;
