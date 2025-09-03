import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './OrderSuccess.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHome, faBox } from '@fortawesome/free-solid-svg-icons';

export default function OrderSuccess() {
    const location = useLocation();
    const { order } = location.state || {};

    if (!order) {
        return (
            <div className="order-success-container">
                <h2>No hay información de la orden</h2>
                <Link to="/" className="order-btn btn-home">
                    Volver al inicio <FontAwesomeIcon icon={faHome} />
                </Link>
            </div>
        );
    }

    const { _id, items, total, createdAt } = order;

    return (
        <div className="order-success-container">
            <FontAwesomeIcon icon={faCheckCircle} className="order-success-icon" />
            <h2 className="order-success-title">¡Gracias por tu compra!</h2>
            <p className="order-success-text">Tu orden ha sido registrada con éxito.</p>

            <div className="order-details">
                <p><strong>Número de orden:</strong> {_id}</p>
                <p><strong>Fecha:</strong> {new Date(createdAt).toLocaleString()}</p>
                <p><strong>Total:</strong> ${total.toFixed(2)}</p>
            </div>

            <h3>Productos:</h3>
            <ul className="order-items">
                {items.map(item => (
                    <li key={item._id?.$oid || item._id}>
                        <FontAwesomeIcon icon={faBox} /> {item.name} x{item.quantity} — ${item.price.toFixed(2)}
                    </li>
                ))}
            </ul>

            <div className="order-success-actions">
                <Link to="/orders" className="order-btn btn-orders">Ver mis pedidos</Link>
                <Link to="/" className="order-btn btn-home">Volver al inicio</Link>
            </div>
        </div>
    );
}