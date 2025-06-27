import React from 'react';
import './UserCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEnvelope , faClock } from '@fortawesome/free-solid-svg-icons';

export default function UserCard({ user, onEdit, onDelete }) {
    return (
        <div className="user-card">
            <h3>{user.name}</h3>
            <p><FontAwesomeIcon icon={faEnvelope} /> {user.email}</p>
            <p><strong>Provincia:</strong> {user.province}</p>
            <p><strong>Fecha de nacimiento:</strong> {user.fecha_nacimiento}</p>
            {user.comment && <p><strong>Observaciones:</strong> {user.comment}</p>}
            <p className="created-date"> <FontAwesomeIcon icon={faClock} /> Registrado el: {new Date(user.createdAt).toLocaleDateString()}</p>

            <div className="user-card-buttons">
                <button onClick={() => onEdit(user)} className="btn btn-edit">
                    <FontAwesomeIcon icon={faEdit} /> Editar
                </button>
                <button onClick={() => onDelete(user.id)} className="btn btn-delete">
                    <FontAwesomeIcon icon={faTrash} /> Eliminar
                </button>
            </div>
        </div>
    );
}