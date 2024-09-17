import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";
import ShoppingPage from "./pages/ShoppingPage";
import ProductPage from "./pages/ProductPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import { Store } from "./Store";
import { useContext } from "react";
import SigninPage from "./pages/SigninPage";
import ShippingPage from "./pages/ShippingPage";
import SignupPage from "./pages/SignupPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/SearchPage";
import AboutUs from "./pages/AboutUsPage";

export default function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className='flex flex-col min-h-screen'>
          <ToastContainer position='bottom-center' limit={1} />
          <Navbar
            cartItems={cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
          />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/signin' element={<SigninPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/shop' element={<ShoppingPage />} />
            <Route path='product/:slug' element={<ProductPage />} />
            <Route path='shipping' element={<ShippingPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/placeorder' element={<PlaceOrderPage />} />
            <Route path='/order/:id' element={<OrderPage />} />
            <Route path='/orderhistory' element={<OrderHistoryPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/about-us' element={<AboutUs />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
