import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import '../SectionProducts/SectionProducts.css';

export default function SectionProductsFeatured() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await axios.get('http://localhost:3000/products');
                setProducts(response.data.products);
            } catch (error) {
                console.log('Error fetching products:', error);
            }
        }
        getProducts();
    }, []);

    return (
        <section className="featured-section">
            <h2>Productos Destacados</h2>
            <div className="container">
                {products.slice(0, 8).map(product => (
                    <ProductCard key={product._id || product.id} product={product} />
                ))}
            </div>
        </section>
    );
}