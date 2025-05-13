import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import HomePage from "../pages/HomePage";
import CollectionPage from "../pages/CollectionPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import PaymentPage from "../pages/PaymentPage";
import MyOrderPage from "../pages/MyOrderPage";
import AboutUsPage from "../pages/AboutUsPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import AdminLoginPage from "../pages/admin/AdminLoginPage.jsx";
import AdminLayout from "../pages/admin/AdminLayout.jsx";
import AdminHomePage from "../pages/admin/AdminHomePage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import PaymentSuccessPage from "../pages/PaymentSuccessPage.jsx";
import PaymentErrorPage from "../pages/PaymentErrorPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import UserProtectedRoute from "../components/UserProtectedRoute.jsx";
import UserWishlist from "../components/UserWishlist.jsx";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/collections" element={<CollectionPage />} />
        <Route path="/product/:id" element={<ProductPage />} />

        <Route element={<UserProtectedRoute />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/my-order" element={<MyOrderPage />} />
          <Route path="/user-profile" element={<ProfilePage />} />
          <Route path="/user-wishlist" element={<UserWishlist />} />
          <Route path="payment/success" element={<PaymentSuccessPage />} />
          <Route path="payment/error" element={<PaymentErrorPage />} />
        </Route>

        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminLoginPage />} />
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
              <AdminHomePage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
