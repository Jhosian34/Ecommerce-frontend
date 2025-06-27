import axios from 'axios';
import './SectionProducts.css';
import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';

export default function SectionProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await axios.get('https://68476e0dec44b9f3493d0fd0.mockapi.io/products');
                console.log('Productos obtenidos:', response.data);
                setProducts(response.data);
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
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}