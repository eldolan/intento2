import React, { useContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PaginaProducto.css";
import starIcon from "../Assets/star_icon.png";
import starDullIcon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const formatDate = (date) => {
    const d = new Date(date),
        day = '' + d.getDate(),
        month = '' + (d.getMonth() + 1),
        year = d.getFullYear();

    return [day.padStart(2, '0'), month.padStart(2, '0'), year].join('/');
};


const PaginaProducto = ({ product }) => {
    const { addToCart } = useContext(ShopContext);
    const [option, setOption] = useState("");
    const [startDate, setStartDate] = useState("");

    const handleOptionChange = (selectedOption) => {
        setOption(selectedOption);
        if (selectedOption === "Arriendo") {
            setStartDate(new Date().toISOString().split('T')[0]);
        }
    };

    const handleDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const addToCartWithOption = () => {
        addToCart(product.id, option, startDate);
    };


    return (
        <div className="producto-container m-0">
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-6 col-md-6 mb-4">
                        <img className="img-fluid" src={product.image} alt={product.name} />
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <h1>{product.name}</h1>
                        <div className="my-3">
                            {[...Array(5)].map((_, i) => (
                                <img key={i} src={i < 4 ? starIcon : starDullIcon} alt="star" className="me-1" />
                            ))}
                            <span>(122)</span>
                        </div>
                        <div className="my-4">
                            <span className="text-secondary text-decoration-line-through me-3">${product.old_price}</span>
                            <span className="text-danger fw-bold">${product.new_price}</span>
                        </div>
                        <p className="my-4">{product.description}</p>
                        <div>
                            <div className="mb-4">
                                {['Arriendo', 'Compra'].map((opt, i) => (
                                    <button key={i} className={`btn ${option === opt ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`} onClick={() => handleOptionChange(opt)}>
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            {option === "Arriendo" && (
                                <div className="mb-4">
                                    <label htmlFor="startDate" className="form-label">Fecha de inicio del arriendo:</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        value={startDate}
                                        onChange={handleDateChange}
                                        className="form-control"
                                    />
                                </div>
                            )}
                            <button onClick={addToCartWithOption} className="btn btn-danger mb-4">Añadir al carrito</button>
                            <p><strong>Categoría:</strong> {product.category}</p>
                            <p><strong>Tags:</strong> {product.tags?.join(', ')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaginaProducto;
