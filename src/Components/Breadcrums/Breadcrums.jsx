import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './Breadcrums.css';

const Breadcrums = (props) => {
    const { product } = props;
    return (
        <Breadcrumb aria-label="breadcrumb" className="breacrum-container p-3">
            <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
            <Breadcrumb.Item active>{product.category}</Breadcrumb.Item>
            <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>
    );
}

export default Breadcrums;
