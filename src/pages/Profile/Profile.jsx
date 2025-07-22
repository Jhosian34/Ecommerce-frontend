import React, { useState } from 'react';
import UploadAvatar from "../../components/UploadAvatar/UploadAvatar";

export default function Profile() {
    const userData = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(userData);

    const handleAvatarUpload = (imageUrl) => {
        const updatedUser = { ...user, image: imageUrl };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Perfil de {user.name}</h2>
            <img
                src={user.image || '/default-avatar.png'}
                alt="Avatar"
                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <UploadAvatar onUpload={handleAvatarUpload} />
        </div>
    );
}
