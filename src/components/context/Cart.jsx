import React from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTrashRestore } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Cart() {
    const { cart, removeFromCart, clearCart, totalItems, totalPrice } = useCart();

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


    if (cart.length === 0) {
        return <p className="empty-cart-message">El carrito está vacío.</p>;
    }

    const handleCheckout = async () => {
    try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await fetch("http://localhost:3000/orders", {
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
            throw new Error(JSON.stringify(error));
        }

        const result = await response.json();
        Swal.fire("¡Compra realizada!", "Tu orden ha sido registrada con éxito.", "success");
        clearCart();

        const ordersResponse = await fetch("http://localhost:3000/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!ordersResponse.ok) {
            throw new Error("Error al obtener las órdenes");
        }

        const allOrders = await ordersResponse.json();
        console.log("Órdenes desde la base de datos:", allOrders);

    } catch (error) {
        console.error("Error al procesar la compra:", error);
        Swal.fire("Error", "Hubo un problema al procesar la compra.", "error");
    }
};

    return (
        <div className="cart-container">
            <h2>Carrito de Compras</h2>
            <ul className="cart-list">
                {cart.map(product => (
                    <li key={product._id || product.id} className="cart-item">
                        <img
                            src={product.image?.startsWith('http') ? product.image : `http://localhost:3000/uploads/products/${product.image}`}
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

            <button className="clear-cart-btn" onClick={handleClearCart} title="Vaciar carrito">
                <FontAwesomeIcon icon={faTrashRestore} /> Vaciar carrito
            </button>

            <button
                className="checkout-btn"
                onClick={handleCheckout}
                title="Confirmar compra"
            >
                Confirmar compra
            </button>

            <Link to="/" className="back-home-link">
                Volver al Inicio <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
        </div>
    );
}