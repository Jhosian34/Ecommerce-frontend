import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";
import Banner from './components/Banner/Banner';
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Register from "./pages/Register/Register";
import AboutUs from "./pages/AboutUs/AboutUs";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Products from "./pages/Products/Products";
import AdminProducts from './pages/AdminProducts/AdminProducts';
import AddProduct from "./components/AddProduct/AddProduct";
import EditProduct from './components/EditProduct/EditProduct';
import { Route, Routes } from "react-router-dom";
import AdminUser from "./pages/AdminUser/AdminUser";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import ButtonWhatsApp from "./components/ButtonWhatsapp/ButtonWhatsapp";
import Login from "./pages/Login/Login";
import CartDisplay from './components/context/Cart';
import AdminGuard from "./shared/guard/AdminGuard";
import Profile from "./pages/Profile/Profile"


export default function App() {
    return <>
        <Header />
        <Banner />
        <main className="main-container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Products" element={<Products />} />
                <Route path="/AboutUs" element={<AboutUs />} />

                <Route path="/AdminProducts" element={
                    <AdminGuard>
                        <AdminProducts />
                    </AdminGuard>
                } />

                <Route path="/AddProduct" element={<AddProduct />} />
                <Route path="/EditProduct/:id" element={<EditProduct />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/ProductDetail/:id" element={<ProductDetail />} />
                <Route path="/register" element={<Register />} />
                <Route path="/AdminUser" element={
                    <AdminGuard>
                        <AdminUser />
                    </AdminGuard>
                } />
                <Route path="/ProductInfo/:id" element={<ProductInfo />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/cart" element={<CartDisplay />} />

                <Route path="*" element={<h1>Not Found Page</h1>} />

            </Routes>
        </main>
        <ButtonWhatsApp />
        <Footer />
    </>
}