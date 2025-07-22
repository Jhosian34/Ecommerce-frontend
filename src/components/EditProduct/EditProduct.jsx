import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_SERVER_API;

export default function EditProduct() {
    const { id } = useParams();
    const nav = useNavigate();
    const etiquetas = {
        name: "Nombre",
        price: "Precio",
        date: "Fecha",
        image: "Imagen",
        description: "Descripción",
        category: "Categoría",
    };

    const [form, setForm] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(res => {
                const data = res.data.product;
                setForm({
                    name: data.name || '',
                    price: data.price || '',
                    date: data.date ? new Date(data.date * 1000).toISOString().slice(0, 10) : '',
                    image: data.image || '',
                    description: data.description || '',
                    category: data.category || '',
                });
            })
            .catch(err => {
                console.error('Error al cargar producto:', err);
                Swal.fire('Error', 'No se pudo cargar el producto', 'error');
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setImageFile(files[0]);
        } else {
            setForm(prevForm => ({
                ...prevForm,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'price', 'date', 'description', 'category'];
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
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.price);
        formData.append('createdAt', form.date);
        formData.append('description', form.description);
        formData.append('category', form.category);

        if (imageFile) {
            formData.append('file', imageFile);
        }

        await axios.put(`${API_URL}/products/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        Swal.fire('Actualizado', 'Producto modificado con éxito', 'success');
        nav('/adminproducts');
    } catch (err) {
        console.error(err);
        Swal.fire('Error', 'No se pudo actualizar el producto', 'error');
    }
};

    if (!form) return <p>Cargando...</p>;

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>Editar Producto</h2>

            {['name', 'price', 'date', 'description'].map(key => (
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
                <label>{etiquetas.image}:</label>
                <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="styled-file-input"
                />
                {form.image && !imageFile && (
                    <div>
                        <p>Imagen actual:</p>
                        <img
                            src={
                                form.image?.startsWith('http')
                                    ? form.image
                                    : `http://localhost:3000/uploads/products/${form.image}`
                            }
                            alt="Producto"
                            style={{ width: '100px', height: 'auto' }}
                        />
                    </div>
                )}
            </div>

            <div>
                <label>{etiquetas.category}:</label>
                <select name="category" value={form.category} onChange={handleChange}>
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