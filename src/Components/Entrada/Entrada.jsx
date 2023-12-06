import React from "react";
import './Entrada.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Entrada = () => {
    return(
        <Container fluid className="hero d-flex align-items-center justify-content-center text-center p-5">
            <Row>
                <Col lg={6} className="d-flex flex-column justify-content-center align-items-start">
                    <h1 className="mb-4">FINALMENTE</h1>
                    <div className="d-flex align-items-center mb-4">
                        <h1 className="me-4">¡Hola!</h1>
                        <img src={hand_icon} alt="hand icon" className="img-fluid" style={{ width: '80px' }}/>
                    </div>
                    <p className="fs-1 mb-2">Te encuentras</p>
                    <p className="fs-1 mb-2">en el nuevo portal</p>
                    <p className="fs-1 mb-5">de la Biblioteca de Estacion Central</p>
                    <Button variant="danger" className="px-5 py-3" style={{ borderRadius: '50px', fontSize: '1.5rem' }}>
                        Nuestro Catálogo
                        <img src={arrow_icon} alt="arrow icon" className="img-fluid ms-3" style={{ width: '8%' }}/>
                    </Button>
                </Col>
                <Col lg={6} className="d-flex justify-content-center">
                    <img src={hero_image} alt="hero" className="img-fluid"/>
                </Col>
            </Row>
        </Container>
    )
}

export default Entrada;
