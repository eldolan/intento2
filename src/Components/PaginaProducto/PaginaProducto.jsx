import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PaginaProducto.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const PaginaProducto = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-6 col-md-6 mb-4">
                    <div className="productdisplay-img-list mb-3 d-none d-md-flex flex-column align-items-center">
                        {[...Array(4)].map((_, i) => (
                            <img key={i} src={product.image} alt="img" className="img-fluid mb-2" style={{ height: '163px' }} />
                        ))}
                    </div>
                    <div className="productdisplay-img">
                        <img className="productdisplay-main-img img-fluid" src={product.image} alt="img" />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <h1>{product.name}</h1>
                    <div className="d-flex align-items-center my-2">
                        {[...Array(4)].map((_, i) => (
                            <img key={i} src={star_icon} alt="" className="me-1" />
                        ))}
                        <img src={star_dull_icon} alt="" className="me-2" />
                        <p>(122)</p>
                    </div>
                    <div className="d-flex my-4 align-items-center">
                        <div className="text-secondary text-decoration-line-through me-3">${product.old_price}</div>
                        <div className="text-danger">${product.new_price}</div>
                    </div>
                    <p className="my-4">A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.</p>
                    <div>
                        <h2 className="h5 my-4">Select Size</h2>
                        <div className="d-flex flex-wrap mb-4">
                            {['S', 'M', 'L', 'XL', 'XXL'].map((size, i) => (
                                <div key={i} className="border p-2 me-2 mb-2 rounded" style={{ cursor: 'pointer', background: '#fbfbfb' }}>
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => { addToCart(product.id) }} className="btn btn-danger mb-4">ADD TO CART</button>
                    <p className="my-2"><span className="fw-bold">Category :</span> </p>
                    <p className="my-2"><span className="fw-bold">Tags :</span> Modern, Latest</p>
                </div>
            </div>
        </div>
    );
};

export default PaginaProducto;
