// src/App.jsx
import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import productsData from "./data/products.js";

export default function App() {
  const [registeredUser, setRegisteredUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [products] = useState(productsData);
  const navigate = useNavigate();

  function handleSignUp(user) {
    setRegisteredUser(user);
  }

  function handleLogin(user) {
    setLoggedInUser(user);
    navigate("/dashboard");
  }

  function handleLogout() {
    setLoggedInUser(null);
    setCartCount(0);
    navigate("/");
  }

  function handleAddToCart(product) {
    setCartCount((c) => c + 1);
  }

  const isAuthenticated = !!loggedInUser;

  return (
    <div className="appShell">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthPage
                registeredUser={registeredUser}
                onSignUp={handleSignUp}
                onLogin={handleLogin}
              />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DashboardPage
                user={loggedInUser}
                products={products}
                cartCount={cartCount}
                onAddToCart={handleAddToCart}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
