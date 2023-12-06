import React from "react";
import './Popular.css';
import data_product from "../Assets/data";
import Item from "../Item/Item";

const Popular = () => {
    return (
        <div className='container popular'>
            <h1 className="mt-5">MÁS VENDIDOS</h1>
            <hr className="my-4" />
            <div className="row justify-content-center">
                {data_product.map((item, i) => {
                    return <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>;
                })}
            </div>
        </div>
    )
}

export default Popular;
