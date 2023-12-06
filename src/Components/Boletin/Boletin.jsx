import React from "react";

const Boletin = () => {
    return (
        <div className='newsletter container py-5 my-5'>
            <h1 className="text-center mb-3">Se el primero en descubrir libros nuevos</h1>
            <p className="text-center mb-4">Subscríbete a nuestro boletín y mantente al día</p>
            <div className="d-flex justify-content-center">
                <div className="input-group input-group-lg mb-3">
                    <input type="email" className="form-control rounded-pill" placeholder='Tu correo' aria-label="Recipient's email" aria-describedby="button-addon2" />
                    <button className="btn btn-dark rounded-pill" type="button" id="button-addon2">Subscríbete</button>
                </div>
            </div>
        </div>
    )
}

export default Boletin;
