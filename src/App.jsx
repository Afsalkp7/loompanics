import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/homePage/home/Home";
import Layout from "./Layout";
import UserAuth from "./components/registerAndLogin/userAuth/UserAuth";
import PrivateRoute from "./components/registerAndLogin/privateRoute/PrivateRoute";
import PublicRoute from "./components/registerAndLogin/privateRoute/PublicRoute";
import About from "./components/aboutPage/About";
import ContactUs from "./components/contactus/ContactUs";
import UserDetails from "./components/userDetails/UserDetails";
import Shop from "./components/shop/Shop";
import ProductSingle from "./components/shop/ProductSingle";
import ScrollToTop from "./components/layout/ScrollTop";
import NetworkStatus from "./components/layout/NetworkStatus ";
import NotFound from "./components/layout/NotFound";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";

function App() {
  return (
    <>
        <Router>
        <ScrollToTop />
        <NetworkStatus />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <PrivateRoute>
                    <About />
                  </PrivateRoute>
                }
              />
              <Route
                path="/contact"
                element={
                  <PrivateRoute>
                    <ContactUs />
                  </PrivateRoute>
                }
              />
              <Route
                path="/books"
                element={
                  <PrivateRoute>
                    <Shop />
                  </PrivateRoute>
                }
              />
              <Route
                path="/books/:_id"
                element={
                  <PrivateRoute>
                    <ProductSingle />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user"
                element={
                  <PrivateRoute>
                    <UserDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <PrivateRoute>
                    <Checkout />
                  </PrivateRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <UserAuth />
                  </PublicRoute>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
