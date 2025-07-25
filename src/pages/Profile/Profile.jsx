import React, { useState } from 'react';
import UploadAvatar from "../../components/UploadAvatar/UploadAvatar";

export default function Profile() {
    
    const userData = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(userData);

    const handleAvatarUpload = (imageUrl) => {
        const relativePath = imageUrl.replace('http://localhost:3000', '');

        const updatedUser = { ...user, image: relativePath };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Perfil de {user.name}</h2>
            <img
                src={user.image ? `http://localhost:3000${user.image}` : '/default-avatar.png'}
                alt="Avatar"
                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
                onError={(e) => {
    console.log('Error cargando imagen:', user.image);
    e.target.src = '/default-avatar.png';
}}
            />
            <UploadAvatar currentImage={user.image} onUpload={handleAvatarUpload} />
        </div>
    );
}