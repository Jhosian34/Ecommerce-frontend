import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function ContactForm() {
    const [form, setForm] = useState({ nombre: '', correo: '', comment: '' });

    const handleChange = e =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        if (!form.nombre.trim() || !form.correo.trim() || !form.comment.trim()) {
            Swal.fire('Error', 'Completa todos los campos.', 'error');
            return;
        }

        try {
            await axios.post('https://68592c20138a18086dfd59e4.mockapi.io/contact', form);
            Swal.fire('Enviado', 'Tu mensaje ha sido enviado con éxito.', 'success');
            setForm({ nombre: '', correo: '', comment: '' });
        } catch (err) {
            Swal.fire('Error', 'No se pudo enviar el mensaje.', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container-contact">
            <div className="input-group">
                <h3>¿En qué podemos ayudarte?</h3>
                <label htmlFor="nomb">Nombre Completo</label>
                <input
                    type="text"
                    name="nombre"
                    id="nomb"
                    placeholder="Escribe tu Nombre Completo"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="correo">Correo Electrónico</label>
                <input
                    type="email"
                    name="correo"
                    id="correo"
                    placeholder="example@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="comentario">Mensaje</label>
                <textarea
                    name="comment"
                    id="comentario"
                    placeholder="Comentario"
                    rows="6"
                    value={form.comment}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit">Enviar</button>
        </form>
    );
}