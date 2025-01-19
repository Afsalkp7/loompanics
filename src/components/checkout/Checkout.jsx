import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../redux/cartSlice";
import Summery from "../summery/Summery";
import Addresses from "../userDetails/Addresses";

function Checkout() {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const subTotal = cartItems.reduce(
    (sum, item) => sum + parseInt(item.originalPrice) * parseInt(item.quantity),
    0
  );
  const discount = cartItems.reduce(
    (sum, item) => sum + parseInt(item.discount) * parseInt(item.quantity),
    0
  );
  const deliveryCharge = subTotal > 1000 ? 0 : subTotal > 500 ? 50 : 60;
  const orderTotal = subTotal - discount + deliveryCharge;
  return (
    <div className="cartHero">
      <div className="mainSection">
        <div className="cartSection">
          <div className="container">
            <div className="cartHeading">
              <span>Checkout</span>
              <p>Home / checkout</p>
            </div>
            <Addresses />
          </div>
        </div>
        <div className="checkoutSection">
          <Summery subTotal={subTotal} discount={discount} deliveryCharge={deliveryCharge} orderTotal={orderTotal} buttonType={"Checkout"}/>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
