import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function EditProduct() {
    const { id } = useParams();
    const nav = useNavigate();
    const etiquetas = {
        name: "Nombre",
        price: "Precio",
        date: "Fecha",
        image: "Imagen",
        description: "Descripción",
    };
    const [form, setForm] = useState(null);

    useEffect(() => {
        axios.get(`https://68476e0dec44b9f3493d0fd0.mockapi.io/products/${id}`)
            .then(res => {
                const data = res.data;
                setForm({
                    name: data.name || '',
                    price: data.price || '',
                    date: data.date ? new Date(data.date * 1000).toISOString().slice(0, 10) : '',
                    image: data.image || '',
                    description: data.description || '',
                    characteristics: (data.characteristics || []).join(', ')
                });
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
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

        axios.put(`https://68476e0dec44b9f3493d0fd0.mockapi.io/products/${id}`, {
            ...form,
            date: Math.floor(new Date(form.date).getTime() / 1000),
            characteristics: form.characteristics.split(',').map(c => c.trim())
        }).then(() => {
            Swal.fire('Actualizado', 'Producto modificado con éxito', 'success');
            nav('/adminproducts');
        });
    };

    if (!form) return <p>Cargando...</p>;

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>Editar Producto</h2>

            {['name', 'price', 'date', 'image', 'description'].map(key => (
                <div key={key}>
                    <label>{etiquetas[key]}:</label>
                    <input
                        name={key}
                        value={form[key]}
                        onChange={handleChange}
                        type={key === 'date' ? 'date' : 'text'}
                    />
                </div>
            ))}

            <div>
                <label>Características:</label>
                <input
                    name="characteristics"
                    value={form.characteristics}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">Guardar</button>
        </form>
    );
}