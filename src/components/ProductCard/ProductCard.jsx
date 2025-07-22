import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';  
import './ProductCard.css';

function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const imageUrl = product.image?.startsWith('http')
        ? product.image
        : `http://localhost:3000/uploads/products/${product.image}`;

    const handleAddToCart = () => {
        addToCart({ ...product, quantity: 1 });
    };

    return (
        <article className="card">
            <img src={imageUrl} loading="lazy" alt={product.name} />
            <div className="card-content">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <p className="date">Fecha de ingreso: {formatDate(product.createdAt)}</p>
                <div className="card-icons">
                    <button title="Comprar" onClick={handleAddToCart}>
                        <FontAwesomeIcon icon={faCartShopping} className="button" />
                    </button>
                    <button title="Añadir a favoritos">
                        <FontAwesomeIcon icon={faHeart} className="button" />
                    </button>
                    <Link to={`/productdetail/${product._id || product.id}`} className="icon-link" title="Ver detalle">
                        <FontAwesomeIcon icon={faEye} size='lg' />
                    </Link>
                </div>
            </div>
        </article>
    );
}