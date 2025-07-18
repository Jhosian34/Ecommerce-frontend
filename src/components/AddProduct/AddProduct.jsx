import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AddProduct.css';

export default function AddProduct({ onProductAdded }) {
    const [form, setForm] = useState({
        name: '', price: '', date: '', image: '', description: '', characteristics: ''
    });
    const nav = useNavigate();

    const etiquetas = {
        name: "Nombre",
        price: "Precio",
        date: "Fecha",
        image: "Imagen",
        description: "Descripción",
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['name', 'price', 'date', 'image', 'description', 'characteristics'];
        const emptyFields = requiredFields.filter(field =>
            !form[field] || form[field].toString().trim() === ''
        );

        if (emptyFields.length > 0) {
            Swal.fire('Error', 'Por favor completa todos los campos antes de guardar.', 'error');
            return;
        }

        if (isNaN(form.price) || Number(form.price) <= 0) {
            Swal.fire('Error', 'El precio debe ser un número válido y mayor a cero.', 'error');
            return;
        }

        try {
            await axios.post('https://68476e0dec44b9f3493d0fd0.mockapi.io/products', {
                ...form,
                date: Math.floor(new Date(form.date).getTime() / 1000),
                characteristics: form.characteristics.split(',').map(c => c.trim())
            });

            Swal.fire('Éxito', 'Producto agregado correctamente', 'success');
            setForm({
                name: '',
                price: '',
                date: '',
                image: '',
                description: '',
                characteristics: ''
            });

            if (onProductAdded) onProductAdded();

        } catch (err) {
            Swal.fire('Error', 'No se pudo agregar el producto', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='product-form'>
            <h2>Nuevo Producto</h2>
            {['name', 'price', 'date', 'image', 'description'].map(key => (
    <div key={key}>
        <label>{etiquetas[key]}:</label>
        {key === 'description' ? (
            <textarea
                name={key}
                value={form[key]}
                onChange={handleChange}
                rows={4}
                style={{ resize: 'vertical', width: '100%' }}
            />
        ) : (
            <input
                name={key}
                value={form[key]}
                onChange={handleChange}
                type={key === 'date' ? 'date' : 'text'}
            />
        )}
    </div>
))}
            <div>
                <label>Características (separadas por coma):</label>
                <input name="characteristics" value={form.characteristics} onChange={handleChange} type="text" />
            </div>
            <button type="submit">Guardar</button>
        </form>
    );
}