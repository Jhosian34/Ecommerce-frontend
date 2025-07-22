import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../components/context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error('Error al cargar producto:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <main className="container">
      <section className="product-detail">
        <div className="product-detail-container">
          <ProductInfo
            name={product.name}
            price={product.price}
            date={product.date}
            image={product.image}
            description={product.description}
            category={product.category}
            onAddToCart={(qty) => addToCart({ ...product, quantity: qty })}
            onBuyNow={(qty) => console.log(`Comprar ahora: ${qty}`)}
            onAddToFavorites={() => console.log('Añadido a favoritos')}
          />
        </div>

        <div className="additional-info">
          <h3>Categoría</h3>
          <p>{product.category || 'Sin categoría'}</p>
        </div>

        <Link to="/" className="back-home-link">
          Volver al Inicio <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </section>
    </main>
  );
}