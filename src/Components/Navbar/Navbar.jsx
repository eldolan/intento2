import React, {useState, useEffect, useContext} from 'react';
import {Container, Nav, Navbar, Button, NavLink} from 'react-bootstrap';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const NavigationBar = () => {
    const [activeKey, setActiveKey] = useState('catalogo');
    const { isUserAuthenticated, setIsUserAuthenticated } = useContext(ShopContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        setIsUserAuthenticated(!!userId);
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:4000/logout', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                localStorage.removeItem('userToken');
                setIsUserAuthenticated(false);
                localStorage.removeItem('userId');
                navigate('/');
            }
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
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
                    {isUserAuthenticated ? (
                        <Button variant="outline-secondary" onClick={handleLogout}>Cerrar Sesión</Button>
                    ) : (
                        <Link to='/login' className="btn btn-outline-secondary me-2">Iniciar Sesión</Link>
                    )}
                    <Navbar.Text>
                        <Nav.Link as={Link} to='/carrito'>
                            <img
                                alt="Carrito"
                                src={cart_icon}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />
                        </Nav.Link>
                        <span className="cart-count">0</span>
                    </Navbar.Text>
                </div>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
