import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import './RegisterForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import userImg from '../../assets/images/user-profile.png';

export default function Register() {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const inputFileRef = useRef();

    const onSubmit = async (data) => {
        const formData = new FormData();


        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('fecha_nacimiento', data.fecha_nacimiento);
        formData.append('province', data.province);
        formData.append('comment', data.comment || '');

        if (avatar) formData.append('avatar', avatar);

        try {
            await axios.post('http://localhost:3000/users/register', formData, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            Swal.fire({ icon: 'success', title: 'Registro Exitoso ✔', showConfirmButton: false, timer: 2000 });
            reset();
            setAvatar(null);
        } catch (err) {
            console.error('Error al registrar usuario:', err);
            Swal.fire({ icon: 'error', title: 'Error al registrar usuario', text: err?.response?.data?.message || err.message });
        }
    };

    const handleAvatarClick = () => inputFileRef.current?.click();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setAvatar(file);
    };

    return (
        <main className="main-container">
            <h2>Registro</h2>
            <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
                
            
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <img
                        src={avatar ? URL.createObjectURL(avatar) : userImg}
                        alt="Avatar"
                        onClick={handleAvatarClick}
                        style={{ width: 120, height: 120, borderRadius: '50%', cursor: 'pointer', border: '2px solid #ccc' }}
                        title="Haz clic para seleccionar una imagen"
                    />
                    <input
                        ref={inputFileRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>

                <div className="input-group">
                    <label>Nombre Completo</label>
                    <input
                        {...register('name', { required: 'Requerido', minLength: { value: 2, message: 'Mínimo 2 caracteres' } })}
                    />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>

                <div className="input-group">
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Requerido',
                            pattern: { value: /^[\w.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: 'Email inválido' }
                        })}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>

                <div className="input-group">
                    <label>Contraseña</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                                required: 'Requerido',
                                minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                                pattern: { value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, message: 'Debe incluir mayúscula, minúscula y número' }
                            })}
                        />
                        <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
                <div className="input-group">
                    <label>Repetir Contraseña</label>
                    <div className="password-wrapper">
                        <input
                            type={showRepeatPassword ? 'text' : 'password'}
                            {...register('pass_repeat', {
                                required: 'Requerido',
                                validate: (v) => v === watch('password') || 'Las contraseñas no coinciden'
                            })}
                        />
                        <span className="eye-icon" onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
                            <FontAwesomeIcon icon={showRepeatPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    {errors.pass_repeat && <p className="error">{errors.pass_repeat.message}</p>}
                </div>
                <div className="input-group">
                    <label>Fecha de Nacimiento</label>
                    <input type="date" {...register('fecha_nacimiento', { required: 'Requerido' })} />
                    {errors.fecha_nacimiento && <p className="error">{errors.fecha_nacimiento.message}</p>}
                </div>
                <div className="input-group">
                    <label>Provincia</label>
                    <select {...register('province', { required: 'Requerido' })}>
                        <option value="">Seleccioná</option>
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
                        <option value="caba">Ciudad Autónoma de Buenos Aires (CABA)</option>
                    </select>
                    {errors.province && <p className="error">{errors.province.message}</p>}
                </div>

                <div className="input-group">
                    <label>Observaciones</label>
                    <textarea
                        {...register('comment', { minLength: { value: 20, message: 'Mínimo 20 caracteres' } })}
                    ></textarea>
                    {errors.comment && <p className="error">{errors.comment.message}</p>}
                </div>

                <button type="submit">Registrarse</button>
            </form>
        </main>
    );
}