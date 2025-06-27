import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import './RegisterForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Register() {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const onSubmit = async (data) => {
        try {
            const userData = { ...data, createdAt: new Date().toISOString() };
            await axios.post('https://68476e0dec44b9f3493d0fd0.mockapi.io/users', userData);
            Swal.fire({
                icon: 'success',
                title: 'Registro Exitoso ✔',
                showConfirmButton: false,
                timer: 3000
            });
            reset();
        } catch (err) {
            console.error('Error al registrar usuario:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar usuario',
                text: err.message || 'Algo salió mal'
            });
        }
    };
    return (
        <main className="main-container">
            <h2>Registro</h2>
            <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <label htmlFor="nomb">Nombre Completo</label>
                    <input
                        id="nomb"
                        placeholder="Escribe tu Nombre y Apellido"
                        {...register('name', {
                            required: 'Requerido',
                            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                        })}
                    />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>
                <div className="input-group">
                    <label htmlFor="correo">Correo Electrónico</label>
                    <input
                        id="correo"
                        type="email"
                        placeholder="example@gmail.com"
                        {...register('email', {
                            required: 'Requerido',
                            pattern: {
                                value: /^[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/,
                                message: 'Email inválido'
                            }
                        })}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>
                <div className="input-group">
                    <label htmlFor="contraseña">Contraseña</label>
                    <input
                        id="contraseña"
                        type={showPassword ? "text" : "password"}
                        {...register('pass', {
                            required: 'Requerido',
                            minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                            maxLength: { value: 16, message: 'Máximo 16 caracteres' },
                            pattern: {
                                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                                message: 'Debe incluir mayúscula, minúscula y número'
                            }
                        })}
                    />
                    <span
                        className="eye-icon"
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                    {errors.pass && <p className="error">{errors.pass.message}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="repite-contraseña">Repetir Contraseña</label>
                    <input
                        id="repite-contraseña"
                        type={showRepeatPassword ? "text" : "password"}
                        {...register('pass_repeat', {
                            required: 'Requerido',
                            validate: (value) =>
                                value === watch('pass') || 'Las contraseñas no coinciden'
                        })}
                    />
                    <span
                        className="eye-icon"
                        onClick={() => setShowRepeatPassword(prev => !prev)}
                    >
                        <FontAwesomeIcon icon={showRepeatPassword ? faEyeSlash : faEye} />
                    </span>
                    {errors.pass_repeat && <p className="error">{errors.pass_repeat.message}</p>}
                </div>
                <div className="input-group">
                    <label htmlFor="fecha-nacimiento">Fecha de Nacimiento</label>
                    <input
                        id="fecha-nacimiento"
                        type="date"
                        {...register('fecha_nacimiento', { required: 'Requerido' })}
                    />
                    {errors.fecha_nacimiento && <p className="error">{errors.fecha_nacimiento.message}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="provincia">Provincia</label>
                    <select id="provincia" {...register('province', { required: 'Requerido' })}>
                        <option value="">Seleccione</option>
                        <option value="buenos_aires">Buenos Aires</option>
                        <option value="catamarca">Catamarca</option>
                        <option value="chaco">Chaco</option>
                        <option value="chubut">Chubut</option>
                        <option value="cordoba">Córdoba</option>
                        <option value="corrientes">Corrientes</option>
                        <option value="entre_rios">Entre Ríos</option>
                        <option value="formosa">Formosa</option>
                        <option value="jujuy">Jujuy</option>
                        <option value="la_pampa">La Pampa</option>
                        <option value="la_rioja">La Rioja</option>
                        <option value="mendoza">Mendoza</option>
                        <option value="misiones">Misiones</option>
                        <option value="neuquen">Neuquén</option>
                        <option value="rio_negro">Río Negro</option>
                        <option value="salta">Salta</option>
                        <option value="san_juan">San Juan</option>
                        <option value="san_luis">San Luis</option>
                        <option value="santa_cruz">Santa Cruz</option>
                        <option value="santa_fe">Santa Fe</option>
                        <option value="santiago_del_estero">Santiago del Estero</option>
                        <option value="tierra_del_fuego">Tierra del Fuego</option>
                        <option value="tucuman">Tucumán</option>
                    </select>
                    {errors.province && <p className="error">{errors.province.message}</p>}
                </div>
                <div className="input-group">
                    <label htmlFor="comentario">Observaciones</label>
                    <textarea
                        id="comentario"
                        cols="30"
                        rows="6"
                        {...register('comment', {
                            minLength: { value: 20, message: 'Mínimo 20 caracteres' },
                            maxLength: { value: 300, message: 'Máximo 300 caracteres' }
                        })}
                    ></textarea>
                    {errors.comment && <p className="error">{errors.comment.message}</p>}
                </div>

                <button type="submit">Registrarse</button>
            </form>
        </main>
    );
}
