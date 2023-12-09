import React, { useEffect, useState, useContext } from 'react';
import './Perfil.css';
import { Button } from 'react-bootstrap';
import EditProfileModal from './ModalPerfil';
import { ShopContext } from '../../Context/ShopContext';

const Perfil = () => {
    const { userProfile, fetchUserProfile } = useContext(ShopContext);
    const [error, setError] = useState(null);
    const [perfil, setPerfil] = useState({
        username: '',
        email: '',
        birthDate: '',
        rut: '',
        phone: '',
        address: ''
    })
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        if (!userProfile) {
            fetchUserProfile().catch(err => {
                console.error("Error al cargar el perfil:", err);
                setError(err.message);
            });
        } else {
            setPerfil(userProfile);
        }
    }, [userProfile, fetchUserProfile]);

    const handleInputChange = (e) => {
        setPerfil({
            ...perfil,
            [e.target.name]: e.target.value
        });
    };

        const [newEmail] = useState('');

            const handleSubmit = async () => {
                const updatedProfile = { ...perfil, correo: newEmail };
                try {
                    const token = localStorage.getItem('auth-token');
                    const response = await fetch('http://localhost:4000/perfil', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(updatedProfile)
                    });
                    const data = await response.json();
                    if (response.ok) {
                        console.log('Perfil actualizado:', data);
                    } else {
                        console.error('Error actualizando el perfil:', data);
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            };


        if (error) {
            return <div>Ha ocurrido un error: {error}</div>;
        }

        if (!userProfile) {
            return <div>Cargando perfil...</div>;
        }
        return (
            <div className="perfil d-flex align-items-center justify-content-center" style={{ height: '75vh' }}>
                <div className="perfil-container bg-white rounded-3 shadow p-5" style={{ maxWidth: '580px', width: '100%' }}>
                    <div className="row">
                        <h1 className="text-center mb-4">Mi Perfil</h1>
                        <Button onClick={handleOpenModal}>Editar Perfil</Button>
                        <div className="perfil-datos">
                            <p><strong>Nombre:</strong> {userProfile?.username}</p>
                            <p><strong>Correo:</strong> {userProfile?.email}</p>
                            <p><strong>Fecha de Nacimiento:</strong> {userProfile?.birthDate}</p>
                            <p><strong>RUT:</strong> {userProfile?.rut}</p>
                            <p><strong>Teléfono:</strong> {userProfile?.phone}</p>
                            <p><strong>Dirección:</strong> {userProfile?.address}</p>
                        </div>

                        <EditProfileModal
                            show={showModal}
                            handleClose={handleCloseModal}
                            profile={userProfile}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        );
    };



export default Perfil;