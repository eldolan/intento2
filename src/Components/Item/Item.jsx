import React from "react";
import './Item.css';
import {Link} from "react-router-dom";

const Item = (props) => {
    return (
        <div className='col-12 col-sm-6 col-lg-4 mb-4 item'>
            <Link to={`/product/${props.id}`}><img src={props.image} alt={props.name} className="img-fluid" /></Link>
            <p>{props.name}</p>
            <div className="item-prices d-flex justify-content-start">
                <div className="item-price-new me-3">
                    ${props.new_price}
                </div>
                <div className="item-price-old">
                    ${props.old_price}
                </div>
            </div>
        </div>
    )
}

export default Item;
