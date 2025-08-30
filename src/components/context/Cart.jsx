import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTrashRestore, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_SERVER_API;

export default function Cart() {
    const { cart, removeFromCart, clearCart, totalItems, totalPrice } = useCart();
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const handleClearCart = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción vaciará todos los productos del carrito.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, vaciar carrito',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart();
                Swal.fire('¡Carrito vaciado!', '', 'success');
            }
        });
    };

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user"));

            const response = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    user: user._id,
                    items: cart.map(item => ({
                        productId: item._id || item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image
                    })),
                    total: totalPrice,
                    status: "pending"
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Error desconocido");
            }

            await response.json();
            Swal.fire("¡Compra realizada!", "Tu orden ha sido registrada con éxito.", "success");
            clearCart();
            nav('/orders');
        } catch (error) {
            console.error("Error al procesar la compra:", error);
            Swal.fire("Error", error.message || "Hubo un problema al procesar la compra.", "error");
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return <p className="empty-cart-message">El carrito está vacío.</p>;
    }

    return (
        <div className="cart-container">
            <h2>Carrito de Compras</h2>
            <ul className="cart-list">
                {cart.map(product => (
                    <li key={product._id || product.id} className="cart-item">
                        <img
                            src={product.image?.startsWith('http') ? product.image : `${API_URL}/uploads/products/${product.image}`}
                            alt={product.name}
                            className="cart-item-image"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/default-image.png';
                            }}
                        />
                        <div className="cart-item-info">
                            <h4>{product.name}</h4>
                            <p>Precio unitario: ${product.price}</p>
                            <p>Cantidad: {product.quantity}</p>
                            <p>Subtotal: ${(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                        <button
                            className="remove-btn"
                            onClick={() => removeFromCart(product._id || product.id)}
                            title="Eliminar producto"
                            disabled={loading}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                    </li>
                ))}
            </ul>

            <div className="cart-summary">
                <p><strong>Total productos:</strong> {totalItems}</p>
                <p><strong>Total a pagar:</strong> ${totalPrice.toFixed(2)}</p>
            </div>

            <button
                className="clear-cart-btn"
                onClick={handleClearCart}
                title="Vaciar carrito"
                disabled={loading}
            >
                <FontAwesomeIcon icon={faTrashRestore} /> Vaciar carrito
            </button>

            <button
                className="checkout-btn"
                onClick={handleCheckout}
                title="Confirmar compra"
                disabled={loading}
            >
                {loading ? 'Procesando...' : 'Confirmar compra'}
            </button>

            <Link to="/" className="back-home-link">
                Volver al Inicio <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
        </div>
    );
}