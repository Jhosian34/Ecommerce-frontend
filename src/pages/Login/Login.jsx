import React from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const API_URL = import.meta.env.VITE_SERVER_API;


export default function Login() {
    const navigate = useNavigate();
    async function login(authData) {
        console.log(authData)
        try {

            const { data } = await axios.post(`${API_URL}/users/login`, authData);

            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);

            const { data: currentUserData } = await axios.get(`${API_URL}/users/me`, {
                headers: { Authorization: `Bearer ${data.token}` }
            });

            localStorage.setItem("user", JSON.stringify(currentUserData.user));

            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: '¡Bienvenido de nuevo!',
            });

            navigate('/');
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesión',
                text: error.response?.data?.message || 'Ocurrió un error inesperado.',
            });
        }
    }
    const { register, handleSubmit } = useForm();
    return (
        <div className="login-container">
            <h2>Inicio de Sesión</h2>
            <form onSubmit={handleSubmit(login)}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    {...register("email", { required: true })}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    {...register("password", { required: true })}
                />
                <button className="btn" type="submit">Iniciar Sesión</button>
            </form>
        </div>
    )
}
