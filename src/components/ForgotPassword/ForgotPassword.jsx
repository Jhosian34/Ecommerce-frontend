import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import './ForgotPassword.css';
const API_URL = import.meta.env.VITE_SERVER_API;
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const { register, handleSubmit, reset } = useForm();

    async function onSubmit(data) {
        try {
            await axios.post(`${API_URL}/users/forgot-password`, data);

            Swal.fire({
                icon: 'success',
                title: 'Correo enviado',
                text: 'Revisa tu bandeja de entrada para restablecer tu contraseña.',
            });

            reset();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.',
            });
        }
    }

    return (
        <div className="forgot-password-container">
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                        required: "El email es obligatorio",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Formato de email inválido"
                        }
                    })}
                />
                <button className="btn" type="submit">Enviar enlace de restablecimiento</button>
            </form>
            <div className="back-to-login">
                <Link to="/login">Return to login</Link>
            </div>
        </div>
    );
}