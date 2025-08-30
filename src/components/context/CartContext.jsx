import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const getId = (product) => product._id || product.id;

    const addToCart = (product) => {
        const id = getId(product);
        setCart(prevCart => {
            const exists = prevCart.find(p => getId(p) === id);
            if (exists) {
                return prevCart.map(p =>
                    getId(p) === id ? { ...p, quantity: p.quantity + (product.quantity || 1) } : p
                );
            } else {
                return [...prevCart, { ...product, quantity: product.quantity || 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(p => getId(p) !== id));
    };

    const clearCart = () => setCart([]);

    const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.quantity || 1) * item.price, 0);

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);