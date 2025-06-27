import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utils/formatDate';
import './ProductInfo.css';

export default function ProductInfo({
    name,
    price,
    date,
    image,
    description,
    characteristics = [],
    onAddToCart,
    onBuyNow,
    onAddToFavorites,
}) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const val = Number(e.target.value);
        if (val >= 1) setQuantity(val);
    };

    const parsedCharacteristics = Array.isArray(characteristics)
        ? characteristics
        : String(characteristics).split(',').map(item => item.trim());

    return (
        <>
            <main className='container'>
                <section className='product-detail'>
                    <div className="product-detail-container">
                        <div className="product-image">
                            <img src={image} alt={name} />
                        </div>
                        <div className="product-info">
                            <h2>{name}</h2>
                            <p className="price">${price}</p>
                            <p className="date">Fecha de ingreso: {formatDate(date)}</p>
                            <p className="description">{description}</p>
                        <form className="quantity-form" onSubmit={e => e.preventDefault()}>
                            <label htmlFor="quantity">Cantidad:</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                                required
                            />
                            <button
                                type="button"
                                className="add-to-cart-btn"
                                onClick={() => onAddToCart(quantity)}
                            >
                                Añadir al carrito
                            </button>
                        </form>
                        <div className="product-actions">
                            <button className="buy-now-btn" onClick={() => onBuyNow(quantity)}>Comprar ahora</button>
                            <button className="favorite-btn" onClick={onAddToFavorites}>
                                <FontAwesomeIcon icon={faHeart} /> Añadir a favoritos
                            </button>
                        </div>
                        </div>
                        
                        
                    </div>
                </section>
            </main>
        </>
    );
}