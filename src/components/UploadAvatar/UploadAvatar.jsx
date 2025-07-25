import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import userImg from '../../assets/images/user-profile.png';

export default function UploadAvatar({ currentImage, onUpload }) {
    const [file, setFile] = useState(null);
    const inputFileRef = useRef(null);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        setFile(selectedFile);

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:3000/avatars/upload', {  
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();

            console.log('Respuesta del backend:', data);

            if (res.ok) {
                onUpload(data.imageUrl);
                Swal.fire('¡Éxito!', 'Imagen subida correctamente', 'success');
            } else {
                Swal.fire('Error', data.message || 'Error al subir imagen', 'error');
            }
        } catch (error) {
            Swal.fire('Error', error.message || 'Error en la petición', 'error');
        }
    };

    const handleClickAvatar = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    return (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <img
                src={currentImage ? (currentImage.startsWith('http') ? currentImage : `http://localhost:3000${currentImage}`) : userImg}
                alt="Avatar"
                onClick={handleClickAvatar}
                style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: '2px solid #ccc',
                }}
                title="Haz clic para cambiar tu imagen"
            />
            <input
                type="file"
                ref={inputFileRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
            />
        </div>
    );
}