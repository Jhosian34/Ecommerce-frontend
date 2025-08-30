import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AddProduct.css';

const API_URL = import.meta.env.VITE_SERVER_API;

export default function AddProduct({ onProductAdded }) {
    const [form, setForm] = useState({
        name: '',
        price: '',
        date: '',
        image: null,
        description: '',
        category: '',
    });

    const nav = useNavigate();

    const etiquetas = {
        name: 'Nombre',
        price: 'Precio',
        date: 'Fecha',
        image: 'Imagen',
        description: 'Descripción',
        category: 'Categoría',
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setForm({ ...form, image: files && files[0] ? files[0] : null });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['name', 'price', 'date', 'description', 'category'];
        const emptyFields = requiredFields.filter(
            (field) => !form[field] || (typeof form[field] === 'string' && form[field].trim() === '')
        );

        if (!form.image) {
            Swal.fire('Error', 'Por favor selecciona una imagen.', 'error');
            return;
        }

        if (emptyFields.length > 0) {
            Swal.fire('Error', 'Por favor completa todos los campos antes de guardar.', 'error');
            return;
        }

        if (isNaN(form.price) || Number(form.price) <= 0) {
            Swal.fire('Error', 'El precio debe ser un número válido y mayor a cero.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.price);
        formData.append('description', form.description);
        formData.append('file', form.image);
        formData.append('category', form.category);
        formData.append('date', Math.floor(new Date(form.date).getTime() / 1000)); // Unix timestamp en segundos

        try {
            const token = localStorage.getItem('token');

            await axios.post(`${API_URL}/products`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            Swal.fire('Éxito', 'Producto agregado correctamente', 'success');

            setForm({
                name: '',
                price: '',
                date: '',
                image: null,
                description: '',
                category: '',
            });

            if (onProductAdded) onProductAdded();
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'No se pudo agregar el producto', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h3>Nuevo Producto</h3>
            {['name', 'price', 'date', 'description'].map((key) => (
                <div key={key}>
                    <label>{etiquetas[key]}:</label>
                    {key === 'description' ? (
                        <textarea
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            rows={4}
                            style={{ resize: 'vertical', width: '100%' }}
                            required
                        />
                    ) : (
                        <input
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            type={key === 'date' ? 'date' : 'text'}
                            required
                        />
                    )}
                </div>
            ))}

            <div>
                <label>{etiquetas.image}:</label>
                <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="styled-file-input"
                    required
                />
            </div>

            <div>
                <label>{etiquetas.category}:</label>
                <select name="category" value={form.category} onChange={handleChange} required>
                    <option value="">Selecciona una categoría</option>
                    <option value="electrodoméstico">Electrodoméstico</option>
                    <option value="iluminación">Iluminación</option>
                    <option value="herramienta eléctrica">Herramienta eléctrica</option>
                    <option value="componente eléctrico">Componente eléctrico</option>
                    <option value="cableado">Cableado</option>
                </select>
            </div>

            <button type="submit">Guardar</button>
        </form>
    );
}