import { useNavigate, NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo2.png';
import userImg from '../../assets/images/user-profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome, faBox, faUsersCog, faUserPlus, faPhoneAlt, faInfoCircle, faCartShopping, faUserShield
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useRef } from 'react'
import { useCart } from '../../components/context/CartContext.jsx';
import { useUser } from '../../components/context/UserContext';

export default function Header() {
    const inputFileRef = useRef(null);
    const navigate = useNavigate();
    const { user, logoutUser, updateUser } = useUser();
    const { totalItems, setCart } = useCart();

    const currentUser = user || JSON.parse(localStorage.getItem('user'));

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
                logoutUser();     
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

    const handleClickAvatar = () => {
        if(inputFileRef.current) inputFileRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('avatar', file);
        const userId = currentUser?._id || currentUser?.id;

        console.log('currentUser:', currentUser);
    console.log('userId extraído:', userId);


    if (!userId) {
        Swal.fire('Error', 'No se pudo obtener el ID del usuario', 'error');
        return;
    }
    


        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3000/avatars/upload/${userId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {

                const relativePath = data.imageUrl.replace('http://localhost:3000', '');
                const updatedUser = { ...currentUser, avatar: relativePath };
                updateUser(updatedUser);

                Swal.fire('¡Éxito!', 'Imagen subida correctamente', 'success');
            } else {
                Swal.fire('Error', data.message || 'Error al subir imagen', 'error');
            }
        } catch (error) {
            Swal.fire('Error', error.message || 'Error en la petición', 'error');
        }
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
                            {currentUser?.role === 'admin' && (
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
                            {currentUser?.role === 'admin' && (
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

                    {currentUser ? (
                        <button onClick={handleLogout} className="btn-logout">Logout</button>) : (
                        <NavLink to="/Login" className="btn-login">Login</NavLink>
                    )}
                    {currentUser && (
                        <div className='name-login'>{currentUser.name}</div>
                    )}
                    <NavLink to="/cart" className="cart-icon-container" style={{ position: 'relative' }}>
                        <FontAwesomeIcon icon={faCartShopping} size="lg" className="footer-icon" />
                        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                    </NavLink>
                    <img
                        className="header-logo"
                        src={
                            currentUser?.avatar
                                ? currentUser.avatar.startsWith('http')
                                    ? currentUser.avatar
                                    : `http://localhost:3000${currentUser.avatar}`
                                : userImg
                        }
                        alt="user-profile"
                        style={{ cursor: 'pointer', borderRadius: '50%', width: 40, height: 40 }}
                        onClick={handleClickAvatar}
                        title="Haz clic para cambiar tu imagen"
                    />
                    <input
                        type="file"
                        ref={inputFileRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </div>
            </header>
        </>
    );
}