import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Collections from "../pages/Collections";
import ProductDetails from "../pages/ProductDetails";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}
