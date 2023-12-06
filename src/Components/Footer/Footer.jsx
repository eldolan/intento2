import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import footer_logo from '../Assets/logo.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pinterest_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
    return (
        <footer className="footer text-white text-center py-4">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start mb-3 mb-md-0">
                        <img src={footer_logo} alt="" className="footer-logo"/>
                        <span className="footer-logo-text ms-3">Biblioteca Estación Central</span>
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-center align-items-center my-3 my-md-0">
                        <ul className="nav justify-content-center">
                            <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Biblioteca</a></li>
                            <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Productos</a></li>
                            <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Locales</a></li>
                            <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Nosotros</a></li>
                            <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Contacto</a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-3 d-flex justify-content-center justify-content-md-end align-items-center">
                        <a href="#" className="mx-2"><img src={instagram_icon} alt="" className="social-icon"/></a>
                        <a href="#" className="mx-2"><img src={pinterest_icon} alt="" className="social-icon"/></a>
                        <a href="#" className="mx-2"><img src={whatsapp_icon} alt="" className="social-icon"/></a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <hr className="my-4" />
                        <p className="mb-0">Desarrollo web © 2023 - Vivanco's fan club</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
