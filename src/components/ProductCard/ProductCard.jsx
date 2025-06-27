import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function formatDate(timestamp) {
    const dateObj = new Date(timestamp * 1000);
    return dateObj.toLocaleDateString();
}

export default function ProductCard({ product }) {
    return (
        <article className="card">
            <img src={product.image} loading="lazy" alt={product.name} />
            <div className="card-content">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <p className="date">Fecha de ingreso: {formatDate(product.date)}</p>
                <div className="card-icons">
                    <button title="Comprar">
                        <FontAwesomeIcon icon={faCartShopping} className="button" />
                    </button>
                    <button title="Añadir a favoritos">
                        <FontAwesomeIcon icon={faHeart} className="button" />
                    </button>
                    <Link to={`/productdetail/${product.id}`} className="icon-link" title="Ver detalle">
                        <FontAwesomeIcon icon={faEye} />
                    </Link>
                </div>
            </div>
        </article>
    );
}