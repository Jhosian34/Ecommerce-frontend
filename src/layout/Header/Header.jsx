import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo2.png';
import user from '../../assets/images/user-profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faUsersCog, faUserPlus, faPhoneAlt, faInfoCircle, faCartShopping, faUserShield
} from '@fortawesome/free-solid-svg-icons';


export default function Header() {
    return (
        <>
            <header className="main-header">
                <input type="checkbox" className="burger-check" id="burger-check" />
                <label className="burger" htmlFor="burger-check">
                    <div className="burger-line" />
                </label>
                <div className="header-left">
                    <NavLink to="/">
                        <img className="header-logo" src={logo} alt="logo-djsoluciones" />
                    </NavLink>

                    <nav className="main-nav">
                        <ul className="nav-list">
                            <li className="nav-item">
                                <NavLink to="/" className="nav">
                                    <FontAwesomeIcon icon={faHome} className="footer-icon hide-on-mobile" /> Principal
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Products" className="nav">
                                    <FontAwesomeIcon icon={faBox} className="footer-icon hide-on-mobile" /> Productos
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/AdminProducts" className="nav">
                                    <FontAwesomeIcon icon={faUsersCog} className="footer-icon hide-on-mobile" /> Admin. Productos
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Register" className="nav">
                                    <FontAwesomeIcon icon={faUserPlus} className="footer-icon hide-on-mobile" /> Registro
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/AdminUser" className="nav">
                                    <FontAwesomeIcon icon={faUserShield} className="footer-icon hide-on-mobile" /> Admin. Usuarios
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact" className="nav">
                                    <FontAwesomeIcon icon={faPhoneAlt} className="footer-icon hide-on-mobile" /> Contacto
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/AboutUs" className="nav">
                                    <FontAwesomeIcon icon={faInfoCircle} className="footer-icon hide-on-mobile" /> Quienes Somos
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="header-right">
                    <div className="cart-icon-container">
                        <FontAwesomeIcon icon={faCartShopping} size='lg' className="footer-icon" />
                        <span className="cart-badge">1</span>
                    </div>
                    <img className="header-logo" src={user} alt="user-profile" />
                </div>
            </header>
        </>
    );
}
