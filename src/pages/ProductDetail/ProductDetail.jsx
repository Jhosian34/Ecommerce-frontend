import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      console.log('Intentando cargar producto con ID:', id);

      try {
        const res = await axios.get(`https://68476e0dec44b9f3493d0fd0.mockapi.io/products/${id}`);
        console.log('Producto obtenido:', res.data);
        setProduct(res.data);
      } catch (error) {
        if (error.response) {
          console.error('Error de respuesta del servidor:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('No se recibió respuesta del servidor:', error.request);
        } else {
          console.error('Error al configurar la solicitud:', error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  const formattedDate = new Date(product.date * 1000).toLocaleDateString();

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
        characteristics={
          Array.isArray(product.characteristics)
            ? product.characteristics
            : [product.characteristics]
        }
        onAddToCart={(qty) => console.log(`Añadido al carrito: ${qty}`)}
        onBuyNow={(qty) => console.log(`Comprar ahora: ${qty}`)}
        onAddToFavorites={() => console.log('Añadido a favoritos')}
      />
    </div>
    <div className="additional-info">
    <h3>Características</h3>
    <ul>
      {Array.isArray(product.characteristics)
        ? product.characteristics.map((item, idx) => <li key={idx}>{item}</li>)
        : <li>{product.characteristics}</li>}
    </ul>
  </div>
  <Link to="/" className="back-home-link">
  Volver al Inicio <FontAwesomeIcon icon={faArrowLeft} />
</Link>
  </section>

</main>
  );
}
