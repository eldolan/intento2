import React, {useEffect, useContext, useState} from 'react';
import './Perfil.css';
import { Button } from 'react-bootstrap';
import EditProfileModal from './ModalPerfil';
import { ShopContext } from '../../Context/ShopContext';
import {useNavigate} from "react-router-dom";

const Perfil = () => {
    const navigate = useNavigate();
    const { userProfile, fetchUserProfile, isUserAuthenticated, fetchSolicitudes } = useContext(ShopContext);
    const [showModal, setShowModal] = useState(false);
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        if (!isUserAuthenticated) {
            navigate('/login'); // Redirige al inicio de sesión si no está autenticado
        } else if (!userProfile) {
            fetchUserProfile().catch(err => {
                console.error("Error al cargar el perfil:", err);
            });
        }
    }, [userProfile, fetchUserProfile, isUserAuthenticated, navigate]);

    useEffect(() => {
        if (isUserAuthenticated && userProfile) {
            const fetchSolicitudesUsuario = async () => {
                try {
                    const response = await fetch(`/api/solicitudes/usuario/${userProfile._id}`, {
                        credentials: 'include',
                    });
                    if (!response.ok) {
                        throw new Error('Error al cargar las solicitudes');
                    }
                    const data = await response.json();
                    setSolicitudes(data);
                } catch (error) {
                    console.error("Error al cargar solicitudes:", error);
                }
            };

            fetchSolicitudesUsuario();
        }
    }, [userProfile, isUserAuthenticated]);


    if (userProfile) {
        fetchSolicitudes();
    }


    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    if (!userProfile) {
        return <div>Cargando perfil...</div>;
    }

    return (
        <div className="perfil d-flex align-items-center justify-content-center" style={{ height: '75vh' }}>
            <div className="perfil-container bg-white rounded-3 shadow p-5" style={{ maxWidth: '580px', width: '100%' }}>
                <h1 className="text-center mb-4">Mi Perfil</h1>
                <div className="perfil-datos">
                    <p><strong>Nombre:</strong> {userProfile.name}</p>
                    <p><strong>Correo:</strong> {userProfile.email}</p>
                    <p><strong>Fecha de Nacimiento:</strong> {userProfile.nacimiento || 'No especificado'}</p>
                    <p><strong>RUT:</strong> {userProfile.rut || 'No especificado' }</p>
                    <p><strong>Teléfono:</strong> {userProfile.telefono || 'No especificado'}</p>
                    <p><strong>Ciudad:</strong> {userProfile.ciudad || 'No especificado'}</p>
                    <p><strong>Region:</strong> {userProfile.region || 'No especificado'}</p>
                    <p><strong>Calle:</strong> {userProfile.calle || 'No especificado'}</p>
                </div>
                <div className="solicitudes-usuario">
                    <h2>Mis Solicitudes</h2>
                    <ul>
                        {solicitudes.map((solicitud) => (
                            <li key={solicitud._id}>
                                Producto: {solicitud.producto?.name ?? 'Nombre no disponible'} -
                                Estado: {solicitud.estado}
                            </li>
                        ))}
                    </ul>
                </div>
                <Button onClick={handleOpenModal}>Editar Perfil</Button>
                <EditProfileModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    profile={userProfile}
                />
            </div>
        </div>
    );
};

export default Perfil;
