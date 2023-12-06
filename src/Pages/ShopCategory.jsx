import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import all_product from "../Components/Assets/all_product";

const ShopCategory = (props) => {

    const {products} = useContext(ShopContext);
    if (!Array.isArray(products)) {
        return <div>Loading...</div>;
    }

    return (
        <div className="shop-category">
            <div className="container-fluid px-0">
                <img className='shopcategory-banner img-fluid w-100' src={props.banner} alt="Category Banner" />
            </div>
            <div className="container my-4">
                <div className="row mb-4 align-items-center justify-content-between">
                    <div className="col-auto">
                        <p className="fw-bold mb-0">Mostrando 1-12 de 36 productos</p>
                    </div>
                    <div className="col-auto">
                        <div className="d-flex align-items-center">
                            <p className="mb-0 me-2">Ordenar por</p>
                            <img src={dropdown_icon} alt="Ordenar" className="img-fluid" />
                        </div>
                    </div>
                </div>
                <div className="row row-cols-2 row-cols-md-2 row-cols-lg-4 g-4">
                    {all_product.map((item, i) => {
                        if (props.category === item.category) {
                            return (
                                <div className="col" key={item.id}>
                                    <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center my-5">
                        <button className="btn shopcategory-loadmore">Ver más</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopCategory;
