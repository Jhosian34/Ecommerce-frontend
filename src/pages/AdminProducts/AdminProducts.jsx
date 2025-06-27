import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AdminProducts.css';
import AddProduct from "../../components/AddProduct/AddProduct";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://68476e0dec44b9f3493d0fd0.mockapi.io/products');
      setProducts(response.data);
    } catch (err) {
      console.error(err);
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
        axios.delete(`https://68476e0dec44b9f3493d0fd0.mockapi.io/products/${id}`).then(() => {
          fetchProducts();
          Swal.fire('Eliminado', 'El producto fue eliminado', 'success');
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
                <th>Características</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td><img src={p.image} alt={p.name} /></td>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{new Date(p.date * 1000).toLocaleDateString()}</td>
                  <td>${p.price}</td>
                  <td>
                    <ul>
                      {Array.isArray(p.characteristics) ? (
                        p.characteristics.map((c, i) => <li key={i}>{c}</li>)
                      ) : (
                        <li>{p.characteristics}</li>
                      )}
                    </ul>
                  </td>
                  <td>
                    <Link to={`/EditProduct/${p.id}`} className="edit-btn icon-btn">
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button onClick={() => deleteProduct(p.id)} className="delete-btn icon-btn">
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