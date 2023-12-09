import React, { useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const NavigationBar = () => {
    const [activeKey, setActiveKey] = useState('catalogo');
    const location = useLocation();
    const navigate = useNavigate();

    const isAuthenticated = () => {
        return localStorage.getItem('auth-token') !== null;
    };

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;


    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="shadow-lg p-3 bg-white rounded-bottom-1">
            <Container fluid>
                <Navbar.Brand href="/" className="d-flex align-items-center ms-3">
                    <img
                        alt="Logo"
                        src={logo}
                        height="30"
                        className="d-inline-block align-top responsive"
                    />{' '}
                    <span className="d-none d-lg-inline">Biblioteca Estacion Central</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Inicio</Link>
                        <Link to="/libros" className={`nav-link ${isActive('/libros') ? 'active' : ''}`}>Libros</Link>
                        <Link to="/multimedia" className={`nav-link ${isActive('/multimedia') ? 'active' : ''}`}>Multimedia</Link>
                        <Link to="/perfil" className={`nav-link ${isActive('/perfil') ? 'active' : ''}`}>Perfil</Link>
                    </Nav>
                </Navbar.Collapse>
                <div className="d-flex align-items-center ms-auto">
                    {isAuthenticated() ? (<Button variant="outline-secondary" onClick={handleLogout}>Cerrar Sesión</Button>) :
                        (<NavLink to='/login'><Button variant="outline-secondary" className="me-2">Iniciar Sesión</Button></NavLink>)}
                    <Navbar.Text>
                        <NavLink to='/carrito'>
                            <img
                                alt="Carrito"
                                src={cart_icon}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />
                        </NavLink>
                        <span className="cart-count">0</span>
                    </Navbar.Text>
                </div>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
