import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faArrowRight, faHome } from '@fortawesome/free-solid-svg-icons';

export default function OrderSuccess() {
    return (
        <div className="order-success-container">
            <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
            <h2>¡Gracias por tu compra!</h2>
            <p>Tu orden ha sido registrada exitosamente. En breve recibirás un correo con los detalles.</p>

            <div className="order-success-actions">
                <Link to="/orders" className="btn btn-orders">
                    Ver mis pedidos <FontAwesomeIcon icon={faArrowRight} />
                </Link>
                <Link to="/" className="btn btn-home">
                    Ir al inicio <FontAwesomeIcon icon={faHome} />
                </Link>
            </div>
        </div>
    );
}