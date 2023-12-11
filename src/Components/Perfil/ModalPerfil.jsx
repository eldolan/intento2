import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ShopContext } from '../../Context/ShopContext';

const EditProfileModal = ({ show, handleClose, profile }) => {
    const [editedProfile, setEditedProfile] = useState({
        name: profile.name,
        nacimiento: profile.nacimiento,
        telefono: profile.telefono,
        rut: profile.rut,
        region: profile.region,
        calle: profile.calle,
        ciudad: profile.ciudad
    });
    const [newEmail, setNewEmail] = useState(profile.email);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const { updateProfile } = useContext(ShopContext);

    const handleInputChange = (e) => {
        setEditedProfile({
            ...editedProfile,
            [e.target.name]: e.target.value
        });
    };

    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmNewPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
    };

    const handleSubmit = () => {
        // Resto del código aquí
        if (newPassword && newPassword !== confirmNewPassword) {
            alert("Las contraseñas nuevas no coinciden");
            return;
        }
        // Si newPassword es vacío, se podría omitir la actualización de contraseña
        updateProfile(profile._id, newEmail, newPassword, currentPassword, editedProfile);
        handleClose();
    };

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
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha de Nacimiento:</Form.Label>
                        <Form.Control
                            type="Date"
                            name="nacimiento"
                            value={profile.nacimiento}
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
                            placeholder="Contraseña actual"
                            value={currentPassword}
                            onChange={handleCurrentPasswordChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ciudad:</Form.Label>
                        <Form.Control
                            type="text"
                            name="ciudad"
                            value={profile.ciudad}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Region:</Form.Label>
                        <Form.Control
                            type="text"
                            name="region"
                            value={profile.region}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Calle:</Form.Label>
                        <Form.Control
                            type="text"
                            name="calle"
                            value={profile.calle}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Teléfono:</Form.Label>
                        <Form.Control
                            type="number"
                            name="telefono"
                            value={profile.telefono}
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
                    <Form.Group>
                        <Form.Label>Nueva Contraseña:</Form.Label>
                        <Form.Control
                            className="mb-2"
                            type="password"
                            placeholder="Nueva contraseña"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                        />
                        <Form.Control
                            className="mb-2"
                            type="password"
                            placeholder="Confirmar nueva contraseña"
                            value={confirmNewPassword}
                            onChange={handleConfirmNewPasswordChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditProfileModal;
