import React from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2';


const API_URL = import.meta.env.VITE_SERVER_API;


export default function Login() {

    async function login(authData) {
        console.log(authData)
        console.log("API_URL:", API_URL)
        try {
            const {data} = await axios.post(`${API_URL}/login`, authData)

            console.log(data)
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: '¡Bienvenido de nuevo!',
            });
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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(login)}>
                <p>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        {...register("email", { required: true })}
                    />
                </p>
                <p>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        {...register("password", { required: true })}
                    />
                </p>
                <button className='btn' type='submit'>
                    Iniciar Sesión
                </button>
            </form>
        </div>
    )
}
