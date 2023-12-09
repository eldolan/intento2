import React, {useEffect, useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditProfileModal = ({ show, handleClose, profile, handleInputChange, handleSubmit }) => {
    const [newEmail, setNewEmail] = useState(profile.email);
    const [passwordForEmail, setPasswordForEmail] = useState('');

    useEffect(() => {
        if (profile) {
            setNewEmail(profile.email || '');
        }
    }, [profile]);

    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const handlePasswordForEmailChange = (e) => {
        setPasswordForEmail(e.target.value);
    };

    if (!profile) {
        return null;
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={profile.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha de Nacimiento:</Form.Label>
                        <Form.Control
                            type="date"
                            name="birthDate"
                            value={profile.birthDate}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email (para cambiar el email, ingrese su contraseña):</Form.Label>
                        <Form.Control
                            className="mb-2"
                            type="email"
                            value={newEmail}
                            onChange={handleEmailChange}
                        />
                        <Form.Control
                            className="mb-2"
                            type="password"
                            value={passwordForEmail}
                            onChange={handlePasswordForEmailChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Dirección:</Form.Label>
                        <Form.Control
                            type="text"
                            name="addres"
                            value={profile.address}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Teléfono:</Form.Label>
                        <Form.Control
                            type="text"
                            name="telefono"
                            value={profile.phone}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>RUT:</Form.Label>
                        <Form.Control
                            type="text"
                            name="rut"
                            value={profile.rut}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={() => {
                    handleSubmit();
                    handleClose();
                }}>
                    Guardar Cambios
                </Button>

            </Modal.Footer>
        </Modal>
    );
};

export default EditProfileModal;
