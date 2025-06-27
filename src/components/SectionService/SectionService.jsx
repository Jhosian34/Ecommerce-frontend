import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLightbulb, faStore, faHandshake, faHeadset
} from '@fortawesome/free-solid-svg-icons';
import './SectionService.css'

const Servicios = () => {
    return (
        <section className="section-services">
            <h2 className="section-title">Nuestros Servicios</h2>
            <div className="services-container">

                <div className="service-card">
                    <FontAwesomeIcon icon={faLightbulb} size="3x" className='service-icon'/>
                    <h3>Innovación</h3>
                    <p>Siempre buscamos las soluciones más modernas y eficientes para garantizar el mejor servicio.</p>
                </div>

                <div className="service-card">
                    <FontAwesomeIcon icon={faStore} size="3x"  className='service-icon' />
                    <h3>Stock Permanente</h3>
                    <p>Stock siempre disponible. Amplia variedad de marcas y materiales.</p>
                </div>

                <div className="service-card">
                    <FontAwesomeIcon icon={faHandshake} size="3x"  className='service-icon'/>
                    <h3>Atención Personalizada</h3>
                    <p>Te guiamos para encontrar tu producto ideal.</p>
                </div>

                <div className="service-card">
                    <FontAwesomeIcon icon={faHeadset} size="3x" className='service-icon' />
                    <h3>Atención al Cliente</h3>
                    <p>Nos comprometemos a brindarte soporte constante y personalizado para resolver cualquier duda.</p>
                </div>

            </div>
        </section>
    );
};

export default Servicios;