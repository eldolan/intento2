import React from "react";
import './Novedades.css';
import new_collection from '../Assets/novedades';
import Item from '../Item/Item';

const Novedades = () => {
    return (
        <div className='container new-collections'>
            <h1 className="mt-5">Novedades</h1>
            <hr className="my-4" />
            <div className="row justify-content-center mb-5">
                {new_collection.map((item) => (
                    <Item key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}

export default Novedades;
