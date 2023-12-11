import React, {useContext, useEffect, useState} from "react";
import "./CSS/LoginSignup.css";
import {useNavigate} from "react-router-dom";
import {ShopContext} from "../Context/ShopContext";


const LoginSignup = () => {
    const [state, setState] = useState("Iniciar Sesión");
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setIsUserAuthenticated } = useContext(ShopContext);

    const toggleForm = () => {
        setState(state === "Iniciar Sesión" ? "Crear Cuenta" : "Iniciar Sesión");
    };

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('userId', data.userId);
                setIsUserAuthenticated(true); // Actualizar el estado de autenticación
                navigate('/');
            } else {
                setError(data.message); // Establece el mensaje de error
            }
        } catch (error) {
            console.error("Error en la solicitud de inicio de sesión", error);
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            navigate('/perfil');
        }
    }, [navigate]);

    const signUp = async () => {
        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('userId', data.userId); // Guardar userId en localStorage
                navigate('/'); // Redirige a la página principal
            } else {
                setError(data.message); // Establece el mensaje de error
            }
        } catch (error) {
            console.error("Error en la solicitud de registro", error);
        }
    };



    return (
        <div className="loginsignup d-flex align-items-center justify-content-center" style={{ height: '75vh'}}>
            <div className="loginsignup-container bg-white rounded-3 shadow p-5" style={{ maxWidth: '580px', width: '100%' }}>
                <h1 className="text-center mb-4">{state}</h1>
                <div className="loginsignup-fields mb-3">
                    {state === "Crear Cuenta" && <input type="text" className="form-control mb-3" placeholder="Nombre" name="name" value={formData.name} onChange={changeHandler} />}
                    <input type="correo" className="form-control mb-3" placeholder="Correo Electrónico" name="email" value={formData.email} onChange={changeHandler} />
                    <input type="password" className="form-control" placeholder="Contraseña" name="password" value={formData.password} onChange={changeHandler} />
                </div>

                <button className="btn btn-primary w-100 my-3" style={{ height: '72px' }} onClick={state === "Iniciar Sesión" ? login : signUp}>
                    Continuar
                </button>

                <p className="text-center">
                    {state === "Iniciar Sesión"
                        ? "¿No tienes cuenta? "
                        : "¿Ya tienes una cuenta? "}
                    <span className="text-primary" style={{ cursor: 'pointer' }} onClick={toggleForm}>
                        {state === "Iniciar Sesión" ? "Haz click aquí" : "Inicia sesión aquí"}
                    </span>
                </p>

                <div className="form-check d-flex align-items-center mt-4">
                    <input type="checkbox" className="form-check-input me-2" id="agreeTerms" />
                    <label className="form-check-label" htmlFor="agreeTerms">He leído y acepto los términos y condiciones de uso</label>
                </div>
            </div>
            {error && <div className="alert alert-warning" role="alert">{error}</div>}
        </div>
    );
};

export default LoginSignup;
