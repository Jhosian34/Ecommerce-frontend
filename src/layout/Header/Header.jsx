import { useNavigate, NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo2.png';
import userImg from '../../assets/images/user-profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome, faBox, faUsersCog, faUserPlus, faPhoneAlt, faInfoCircle, faCartShopping, faUserShield
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

import { useCart } from '../../components/context/CartContext.jsx';


export default function Header() {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'))

    const { totalItems, setCart } = useCart();
    const handleLogout = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem("cart");

                setCart([]);

                Swal.fire({
                    icon: 'success',
                    title: 'Sesión cerrada',
                    text: 'Has cerrado sesión exitosamente',
                    timer: 1500,
                    showConfirmButton: false
                });

                navigate('/login');
            }
        });
    };
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
                            {user?.role === 'admin' && (
                                <li className="nav-item">
                                    <NavLink to="/AdminProducts" className="nav">
                                        <FontAwesomeIcon icon={faUsersCog} className="footer-icon hide-on-mobile" /> Admin. Productos
                                    </NavLink>
                                </li>
                            )}
                            <li className="nav-item">
                                <NavLink to="/Register" className="nav">
                                    <FontAwesomeIcon icon={faUserPlus} className="footer-icon hide-on-mobile" /> Registro
                                </NavLink>
                            </li>
                            {user?.role === 'admin' && (
                                <li className="nav-item">
                                    <NavLink to="/AdminUser" className="nav">
                                        <FontAwesomeIcon icon={faUserShield} className="footer-icon hide-on-mobile" /> Admin. Usuarios
                                    </NavLink>
                                </li>
                            )}

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

                    {user ? (
                        <button onClick={handleLogout} className="btn-logout">Logout</button>) : (
                        <NavLink to="/Login" className="btn-login">Login</NavLink>
                    )}
                    {user && (
                        <div className='name-login'>{user.name}</div>
                    )}
                    <NavLink to="/cart" className="cart-icon-container" style={{ position: 'relative' }}>
                        <FontAwesomeIcon icon={faCartShopping} size="lg" className="footer-icon" />
                        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                    </NavLink>
                    <img className="header-logo" src={userImg} alt="user-profile" />
                </div>
            </header>
        </>
    );
}
