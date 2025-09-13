import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import './ResetPassword.css';

const API_URL = import.meta.env.VITE_SERVER_API;

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post(`${API_URL}/users/reset-password`, {
                token,
                newPassword: data.newPassword
            });

            Swal.fire({
                icon: 'success',
                title: 'Contraseña actualizada',
                text: 'Ya puedes iniciar sesión con tu nueva contraseña',
            });

            navigate('/login');

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Ocurrió un error',
            });
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Restablecer contraseña</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    {...register("newPassword", { required: "La contraseña es obligatoria" })}
                />
                <button type="submit">Restablecer contraseña</button>
            </form>
        </div>
    );
}
