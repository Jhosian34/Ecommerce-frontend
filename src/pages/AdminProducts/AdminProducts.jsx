import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AdminProducts.css';
import AddProduct from '../../components/AddProduct/AddProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');


  useEffect(() => {
    if (!user || user.role !== 'admin') {
      Swal.fire('Acceso denegado', 'No tienes permisos para ver esta página', 'error');
      navigate('/');
    }
  }, [navigate, user]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(response.data.products);
    } catch (err) {
      console.error('Error al obtener productos:', err);
      if (err.response?.status === 401) {
        Swal.fire('Sesión expirada', 'Debes volver a iniciar sesión', 'warning');
        navigate('/login');
      }
    }
  };

  const deleteProduct = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/products/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(() => {
            fetchProducts();
            Swal.fire('Eliminado', 'El producto fue eliminado', 'success');
          })
          .catch((err) => {
            console.error('Error al eliminar producto:', err);
            Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
          });
      }
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="main-container">
      <section className="title">
        <h2>Administrador de Productos</h2>
      </section>

      <div className="products-layout">
        <div className="add-form-container">
          <AddProduct onProductAdded={fetchProducts} />
        </div>

        <div className="product-list-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id || p.id}>
                  <td>
                    <img
                      src={
                        p.image?.startsWith('http')
                          ? p.image
                          : `http://localhost:3000/uploads/products/${p.image}`
                      }
                      alt={p.name}
                      width="60"
                      height="60"
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td>${p.price}</td>
                  <td>{p.category}</td>
                  <td>
                    <Link to={`/EditProduct/${p._id || p.id}`} className="edit-btn icon-btn">
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button
                      onClick={() => deleteProduct(p._id || p.id)}
                      className="delete-btn icon-btn"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}