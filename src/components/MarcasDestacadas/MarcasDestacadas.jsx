import React from 'react';
import jeluz from '../../assets/images/productsdestacados/candela.jpg'
import sica from '../../assets/images/productsdestacados/sica.png'
import candela from '../../assets/images/productsdestacados/JELUZ.png'
import richi from '../../assets/images/productsdestacados/richi.png'
import macroled from '../../assets/images/productsdestacados/macroled.png'
import genrod from '../../assets/images/productsdestacados/genrod.png'
import mh from '../../assets/images/productsdestacados/mh.jpg'
import interelec from '../../assets/images/productsdestacados/interelec.png'
import './MarcasDestacadas.css'

const MarcasDestacadas = () => {
    return (
        <section className="container-brands">
            <div className="container-marcas">
                <h2>Marcas Destacadas</h2>
                <div className="brands">
                    <div className="brand-card">
                        <img src={jeluz} loading="lazy" alt="logo-jeluz" />
                    </div>
                    <div className="brand-card">
                        <img src={sica} loading="lazy" alt="logo-sica" />
                    </div>
                    <div className="brand-card">
                        <img src={candela} loading="lazy" alt="logo-candela" />
                    </div>
                    <div className="brand-card">
                        <img src={richi} loading="lazy" alt="logo-richi" />
                    </div>
                    <div className="brand-card">
                        <img src={macroled} loading="lazy" alt="logo-macroled" />
                    </div>
                    <div className="brand-card">
                        <img src={genrod} loading="lazy" alt="logo-genrod" />
                    </div>
                    <div className="brand-card">
                        <img src={mh} loading="lazy" alt="logo-mh" />
                    </div>
                    <div className="brand-card">
                        <img src={interelec} loading="lazy" alt="logo-interelec" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarcasDestacadas;