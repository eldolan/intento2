import React from "react";
import './Novedades.css';
import new_collection from '../Assets/new_collections';
import Item from '../Item/Item';

const Novedades = () => {
    return (
        <div className='container new-collections'>
            <h1 className="mt-5">Novedades</h1>
            <hr className="my-4" />
            <div className="row justify-content-center mb-5">
                {new_collection.map((item, i) => {
                    return (
                            <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                    );
                })}
            </div>
        </div>
    )
}

export default Novedades;
