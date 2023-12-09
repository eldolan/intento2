import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {

    const [state,setState] = useState("Iniciar Sesión");
    const [formData,setFormData] = useState({nombre:"",correo:"",password:""});

    const toggleForm = () => {
        setState(state === "Iniciar Sesión" ? "Crear Cuenta" : "Iniciar Sesión");
    };

    const changeHandler = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const login = async () => {
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                console.log(response.status);
                throw new Error('Error de autenticación. Por favor verifique sus credenciales.');
            }

            console.log('Estado de la respuesta:', response.status);
            const dataObj = await response.json();
            console.log('Respuesta del servidor:', dataObj);

            if (dataObj.success) {
                localStorage.setItem('auth-token', dataObj.token);
                window.location.replace("/");
            } else {

                alert(dataObj.errors || 'Autenticación fallida');
            }
        } catch (error) {

            console.error('Error en la solicitud:', error.message);
            alert(error.message);
        }
    };


    const signup = async () => {
        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                console.log(response.status);
                throw new Error('Error al crear cuenta. Por favor intente nuevamente.');
            }


            console.log('Estado de la respuesta:', response.status);
            const dataObj = await response.json();
            console.log('Respuesta del servidor:', dataObj);

            if (dataObj.success) {
                localStorage.setItem('auth-token', dataObj.token);
                window.location.replace("/");
            } else {
                alert(dataObj.errors || 'Error al crear cuenta');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error.message);
            alert(error.message);
        }
    };


    return (
        <div className="loginsignup d-flex align-items-center justify-content-center" style={{ height: '75vh'}}>
            <div className="loginsignup-container bg-white rounded-3 shadow p-5" style={{ maxWidth: '580px', width: '100%' }}>
                <h1 className="text-center mb-4">{state}</h1>
                <div className="loginsignup-fields mb-3">
                    {state === "Crear Cuenta" && <input type="text" className="form-control mb-3" placeholder="Nombre" name="username" value={formData.username} onChange={changeHandler} />}
                    <input type="correo" className="form-control mb-3" placeholder="Correo Electrónico" name="email" value={formData.email} onChange={changeHandler} />
                    <input type="password" className="form-control" placeholder="Contraseña" name="password" value={formData.password} onChange={changeHandler} />
                </div>

                <button className="btn btn-primary w-100 my-3" style={{ height: '72px' }} onClick={state === "Iniciar Sesión" ? login : signup}>
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
        </div>
    );
};

export default LoginSignup;
