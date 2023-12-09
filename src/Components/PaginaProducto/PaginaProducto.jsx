import React, {useContext, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PaginaProducto.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const formatDate = (date) => {
    const d = new Date(date),
        day = '' + d.getDate(),
        month = '' + (d.getMonth() + 1),
        year = d.getFullYear();

    return [day.padStart(2, '0'), month.padStart(2, '0'), year].join('/');
};


const PaginaProducto = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [option, setOption] = useState("")
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
                        <p className="my-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo erat ut mi finibus aliquet.</p>
                        <div>
                            <div className="d-flex flex-wrap mb-4">
                                {['Arriendo', 'Compra'].map((size, i) => (
                                    <div key={i} className={`border p-2 me-2 mb-2 rounded ${option === size ? 'bg-primary text-white' : 'bg-light'}`} style={{ cursor: 'pointer' }} onClick={() => handleOptionChange(size)}>
                                        {size}
                                    </div>
                                ))}
                            </div>

                            {option === "Arriendo" && (
                                <div>
                                    <label htmlFor="startDate">Fecha de inicio del arriendo:</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        value={startDate}
                                        onChange={handleDateChange}
                                        className="form-control"
                                    />
                                    <p>Fecha de devolución: {formatDate(new Date(startDate).setDate(new Date(startDate).getDate() + 7))}</p>
                                </div>
                            )}

                            <button onClick={addToCartWithOption} className="btn btn-danger mb-4">Añadir al carrito</button>
                            <p className="my-2"><span className="fw-bold">Categoria :</span> </p>
                            <p className="my-2"><span className="fw-bold">Tags :</span> Fantasía, Comic</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaginaProducto;
