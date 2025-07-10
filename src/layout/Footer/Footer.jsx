import React from "react";
import './Footer.css';
import logo from '../../assets/images/logo2.png';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelopeOpenText, faLocationDot } from '@fortawesome/free-solid-svg-icons';


export default function Footer() {
    return (
        <footer className="main-footer">
            <section>
                <h3>Redes Sociales</h3>
                <ul>
                    <li>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} className="footer-icon" /> Facebook
                        </a>
                    </li>
                    <li>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} className="footer-icon" /> Instagram
                        </a>
                    </li>
                    <li>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} className="footer-icon"/> Linkedin
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faYoutube} className="footer-icon" /> Youtube
                        </a>
                    </li>
                </ul>
            </section>


            <section>
                <h3><strong>DjSoluciones</strong></h3>
                <div className="logo-footer">
                    <img className="header-logo" src={logo} alt="logo-djsoluciones" />
                </div>
                <p>2025 - Copyright © DjSoluciones.</p>
            </section>
            <section>
                <h3>Contacto</h3>
                <ul>
                    <li> <NavLink to="/AboutUs" className="nav">
                        Sobre Nosotros
                    </NavLink></li>
                    <li><FontAwesomeIcon icon={faPhone} className="footer-icon" />  Telefono: 011 4262-XXXX</li>
                    <li><FontAwesomeIcon icon={faEnvelopeOpenText} className="footer-icon" /> Email: correo@gmail.com</li>
                    <li><FontAwesomeIcon icon={faLocationDot} className="footer-icon" /> Direccion: Calle falsa 12345</li>
                </ul>
            </section>
        </footer>
    )
}