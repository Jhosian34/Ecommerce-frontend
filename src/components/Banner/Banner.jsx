import React from 'react';
import banner1 from '../../assets/images/banner/adobestock_132070737.jpg';
import banner2 from '../../assets/images/banner/instalaciones-electricas.jpg';
import banner3 from '../../assets/images/banner/proteg-img-data.jpg';
import banner4 from '../../assets/images/banner/shutterstock_118429402.jpg';
import './Banner.css';

export default function Banner() {
    return (
        <section className="main-banner">
            <div className="image-slider">
                <div className="slider-images">
                    <img src={banner1} loading="lazy" alt="cables-electricidad" />
                    <img src={banner2} loading="lazy" alt="Tablero de térmicas" />
                    <img src={banner3} loading="lazy" alt="Energía de alta tensión" />
                    <img src={banner4} loading="lazy" alt="cables-energizados" />
                    <div className="etiqueta-flotando">
                        <h2>Tu aliado en búsqueda de soluciones</h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
