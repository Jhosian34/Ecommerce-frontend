import React from 'react';
import './ButtonWhatsApp.css';

const ButtonWhatsApp = () => {
    return (
        <div className="whatsapp-container">
            <a href="https://wa.link/2p1bl8" target="_blank" rel="noopener noreferrer">
                <img
                    className="whatsapp-logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
                    alt="WhatsApp Logo"
                />
            </a>
        </div>
    );
};
export default ButtonWhatsApp;