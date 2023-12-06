import React from "react";
import exclusive_image from '../Assets/exclusive_image.png';

const Ofertas = () => {
    return (
        <div className="offers">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-3 mb-lg-0">
                        <h1 className="display-3 fw-bold">Arriendos</h1>
                        <h1 className="display-3 fw-bold">En Línea</h1>
                        <p className="fs-4">Ahora puedes manejar todos tus préstamos online y más</p>
                        <button className="btn btn-danger btn-lg px-5 py-3">Ingresa Ahora</button>
                    </div>
                    <div className="col-lg-6 text-lg-end">
                        <img src={exclusive_image} alt="Exclusive" className="img-fluid rounded-5"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ofertas;
