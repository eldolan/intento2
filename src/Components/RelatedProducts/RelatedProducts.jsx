import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './RelatedProducts.css';
import Item from '../Item/Item';
import data_product from '../Assets/masvendidos';

const RelatedProducts = () => {
    return (
        <Container className='relatedproducts'>
            <h1>Productos Relacionados</h1>
            <hr />
            <Row className="relatedproducts-item">
                {data_product.map((item) => (
                    <Col key={item.id} xs={12} sm={6} md={3} lg={4} xl={4} className="mb-4">
                        <Item
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default RelatedProducts;