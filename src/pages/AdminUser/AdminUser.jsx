import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../../components/UserCard/UserCard';
import Swal from 'sweetalert2';
import './AdminUser.css';

const BASE_URL = 'https://68476e0dec44b9f3493d0fd0.mockapi.io/users';

export default function AdminUser() {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        axios.get(BASE_URL)
            .then(res => setUsers(res.data))
            .catch(err => console.error('Error al cargar usuarios', err));
    };

    useEffect(fetchUsers, []);

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: '¿Eliminar usuario?',
            text: 'Esta acción no se puede deshacer.',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((res) => {
            if (res.isConfirmed) {
                axios.delete(`${BASE_URL}/${id}`)
                    .then(() => {
                        Swal.fire('Eliminado', 'Usuario eliminado correctamente.', 'success');
                        fetchUsers();
                    })
                    .catch(err => Swal.fire('Error', 'No se pudo eliminar.', 'error'));
            }
        });
    };

    const handleEdit = (user) => {
        Swal.fire({
            title: 'Editar Usuario',
            html: `
                <input id="swal-name" class="swal2-input" placeholder="Nombre" value="${user.name}" />
                <input id="swal-email" type="email" class="swal2-input" placeholder="Email" value="${user.email}" />
            `,
            confirmButtonText: 'Guardar',
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-name').value.trim();
                const email = document.getElementById('swal-email').value.trim();

                if (!name || !email) {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                    return false;
                }

                return { name, email };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { name, email } = result.value;
                axios.put(`${BASE_URL}/${user.id}`, { ...user, name, email })
                    .then(() => {
                        Swal.fire('Actualizado', 'Usuario editado correctamente.', 'success');
                        fetchUsers();
                    })
                    .catch(() => {
                        Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error');
                    });
            }
        });
    };

    return (
        <section className="admin-usuarios-page">
            <h2>Administración de Usuarios</h2>

            {users.length ? (
                <div className="user-card-container">
                    {users.map(u => (
                        <UserCard
                            key={u.id}
                            user={u}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <p>No hay usuarios registrados.</p>
            )}
        </section>
    );
}