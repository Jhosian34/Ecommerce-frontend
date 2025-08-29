import axios from 'axios';
import './SectionProducts.css';
import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';

export default function SectionProducts({ limit }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await axios.get('https://ecommerce-backend-663o.onrender.com/products');
                setProducts(response.data.products);
            } catch (error) {
                console.log('Error fetching products:', error);
            }
        }

        getProducts();
    }, []);

    const displayedProducts = limit ? products.slice(0, limit) : products;

    return (
        <section className="featured-section">
            <h2>Productos Destacados</h2>
            <div className="container">
                {displayedProducts.map((product) => (
                    <ProductCard key={product._id || product.id} product={product} />
                ))}
            </div>
        </section>
    );
}