import React from "react";
import './Popular.css';
import data_product from "../Assets/masvendidos";
import Item from "../Item/Item";

const Popular = () => {
    return (
        <div className='container popular'>
            <h1 className="mt-5">MÁS VENDIDOS</h1>
            <hr className="my-4" />
            <div className="row justify-content-center">
                {data_product.map((item) => (
                    <Item key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}

export default Popular;
