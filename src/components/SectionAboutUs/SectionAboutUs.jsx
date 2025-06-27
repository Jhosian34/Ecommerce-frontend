import React from 'react';
import logoSomos from '../../assets/images/logosomos.png'
import photo from '../../assets/images/photo.jpg';
import './SectionAboutUs.css'

export default function SectionAboutUs() {
    return (
        <main className="main-container">
            <section>
                <div className="title-parrafo">
                    <h2>Quiénes Somos</h2>
                    <p>
                        Somos una compañía que busca inovar en el sector eléctrico. Trabajamos con las mejores marcas del mercado,
                        garantizando productos que cumplen con los más altos estándares de seguridad y tecnología. Nuestro equipo está
                        compuesto por profesionales capacitados que brindan asesoría personalizada para cada necesidad.
                    </p>
                </div>

                <div className="container-somos">
                    <img src={logoSomos} alt="materiales electricos" />
                    <h2>Misión</h2>
                    <p>
                        Impulsar la transformación del sector eléctrico ofreciendo materiales de vanguardia que integren tecnologías
                        innovadoras y sostenibles, brindando soluciones eficientes que superen las expectativas de nuestros clientes y
                        contribuyan al desarrollo de un futuro energético más inteligente.
                    </p>
                    <h2>Visión</h2>
                    <p>
                        Convertirnos en la empresa referente en el mercado de materiales eléctricos por nuestra capacidad de innovación,
                        la excelencia en el servicio y nuestro compromiso con la sostenibilidad, liderando el camino hacia un entorno
                        eléctrico más moderno, eficiente y responsable.
                    </p>
                    <h2>Nuestro Equipo</h2>
                    <p>
                        Un equipo de profesionales comprometidos con la innovación y la sostenibilidad, que trabaja unido para ofrecer
                        soluciones eficientes y de calidad, superando siempre las expectativas de nuestros clientes.
                    </p>
                </div>

                <div className="container-foto">
                    <div className="photo">
                        <img src={photo} alt="Tu Foto" className="profile-photo" />
                    </div>
                    <div className="info-foto">
                        <h3>Jhosian Salazar</h3>
                        <p>Desarrollador del Proyecto</p>
                    </div>
                </div>
            </section>
        </main>
    );
}