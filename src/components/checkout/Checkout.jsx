


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../redux/cartSlice";
import Summery from "../summery/Summery";
import Addresses from "../userDetails/Addresses";
import { useLocation } from "react-router-dom";
import API from "../../utils/api";

function Checkout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [productDetails, setProductDetails] = useState(null); // State for product details
  const [orderSummary, setOrderSummary] = useState({
    subTotal: 0,
    discount: 0,
    deliveryCharge: 0,
    orderTotal: 0,
  });
  const params = new URLSearchParams(location.search);
  const productId = params.get("productId");


  // Fetch cart items on mount
  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  // Fetch product details if productId exists
  useEffect(() => {
    const fetchProductDetails = async (id) => {
      try {
        const response = await API.get(`/shop/${id}`);
        const product = response.data;
        setProductDetails(product);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setProductDetails(null);
      }
    };

    if (productId) {
      fetchProductDetails(productId);
    }
  }, [location.search]);

  // Calculate order summary
  useEffect(() => {
    const calculateOrderSummary = () => {
      let subTotal = 0;
      let discount = 0;
      let deliveryCharge = 0;

      if (productDetails) {
        const quantity = 1;
        subTotal = productDetails.originalPrice * quantity;
        discount = productDetails.discount * quantity;
        deliveryCharge = subTotal > 1000 ? 0 : subTotal > 500 ? 50 : 60;
      } else {
        subTotal = cartItems.reduce(
          (sum, item) => sum + parseInt(item.originalPrice) * parseInt(item.quantity),
          0
        );
        discount = cartItems.reduce(
          (sum, item) => sum + parseInt(item.discount) * parseInt(item.quantity),
          0
        );
        deliveryCharge = subTotal > 1000 ? 0 : subTotal > 500 ? 50 : 60;
      }

      const orderTotal = subTotal - discount + deliveryCharge;
      setOrderSummary({ subTotal, discount, deliveryCharge, orderTotal });
    };

    calculateOrderSummary();
  }, [productDetails, cartItems]);

  return (
    <div className="cartHero">
      <div className="mainSection">
        <div className="cartSection">
          <div className="container">
            <div className="cartHeading">
              <span>Checkout</span>
              <p>Home / checkout</p>
            </div>
            <Addresses
              isCheckout={true}
              onAddressSelect={(id) => setSelectedAddress(id)}
            />
          </div>
        </div>
        <div className="checkoutSection">
          <Summery
            subTotal={orderSummary.subTotal}
            discount={orderSummary.discount}
            deliveryCharge={orderSummary.deliveryCharge}
            orderTotal={orderSummary.orderTotal}
            buttonType={"Place order"}
            address={selectedAddress || null}
            productId = { productId || null}
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
