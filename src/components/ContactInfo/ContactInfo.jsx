import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo2.png';

export default function Contact() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        comment: ''
    });

    const handleChange = e =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();

        if (!form.name.trim() || !form.email.trim() || !form.comment.trim()) {
            Swal.fire('Error', 'Completa todos los campos.', 'error');
            return;
        }

        try {
            console.log('Enviando datos:', form);
            await axios.post(
                'https://68592c20138a18086dfd59e4.mockapi.io/contact',
                form
            );
            
            Swal.fire('Enviado', 'Tu mensaje ha sido enviado con éxito.', 'success');
            setForm({ name: '', email: '', comment: '' });
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'No se pudo enviar el mensaje.', 'error');
        }
    };

    return (
        <main className="main-container">
            <h2>Contacto</h2>
            <section className="section-contact">
                <div className="container-form">
                    <div className="logo-contact">
                        <img className="header-logo" src={logo} alt="logo-djsoluciones" />
                        <h3>Djsoluciones</h3>
                        <ul className="contact-info">
                            <li>
                                <FontAwesomeIcon icon={faPhoneAlt} /> Teléfono: 011 4262-XXXX
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} /> Email: correo@gmail.com
                            </li>
                        </ul>
                    </div>

                    <div className="title-form">
                        <h3>Formulario de Contacto</h3>
                        <form className="container-contact" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <h3>¿En qué podemos ayudarte?</h3>
                                <label htmlFor="nomb">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="nomb"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Escribe tu Nombre Completo"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="correo">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="correo"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="example@gmail.com"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="comentario">Mensaje</label>
                                <textarea
                                    name="comment"
                                    id="comentario"
                                    value={form.comment}
                                    onChange={handleChange}
                                    placeholder="Comentario"
                                    rows="6"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                </div>

                <div className="map-container">
                    <h3>Nuestra Ubicación</h3>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1250052439814!2d-58.372326056981315!3d-34.67679439999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a33334d9761661%3A0xcea56a6954ff3d9a!2sAv.%20Cris%C3%B3logo%20Larralde%20899%2C%20B1869%20Crucecita%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1738462419320!5m2!1ses-419!2sar"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa ubicación"
                    ></iframe>
                </div>
            </section>
        </main>
    );
}