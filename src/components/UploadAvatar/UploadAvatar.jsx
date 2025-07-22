import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function UploadAvatar({ onUpload }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:3000/avatar/upload', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                onUpload(data.imageUrl); // actualiza en el frontend
                Swal.fire('¡Éxito!', 'Imagen subida correctamente', 'success');
            } else {
                Swal.fire('Error', data.message || 'Error al subir imagen', 'error');
            }
        } catch (error) {
            Swal.fire('Error', error.message || 'Error en la petición', 'error');
        }
    };

    return (
        <div style={{ marginTop: '1rem' }}>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <button onClick={handleUpload}>Subir imagen</button>
        </div>
    );
}