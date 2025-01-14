import { useEffect } from "react";
import "./cart.css";
import { MdOutlineDelete } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, fetchCartItems, updateCartItemQuantity } from "../../redux/cartSlice";
import Error from "../layout/Error";
import toast from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleDelete = (cartId) => {
    const deletedItem = cartItems.find(item => item.cartId === cartId);
    const updatedCartItems = cartItems.filter(item => item.cartId !== cartId);
    dispatch({ type: 'cart/removeItemOptimistically', payload: updatedCartItems });
    dispatch(deleteCartItem(cartId))
    .unwrap() 
    .catch(() => {
      dispatch({ type: 'cart/revertItemDeletion', payload: deletedItem });
    });
};

const handleIncrement = (cartId, currentQuantity) => {
  if(currentQuantity < 5) {
    const newQuantity = parseInt(currentQuantity) + 1;
    dispatch(updateCartItemQuantity({ cartId, quantity: newQuantity }));
  } else {
    toast.error("Maximum 5 quantity allowed at a time for the same item");
  }
  
};

const handleDecrement = (cartId, currentQuantity) => {
  if (currentQuantity > 1) { 
    const newQuantity = parseInt(currentQuantity) - 1;
    dispatch(updateCartItemQuantity({ cartId, quantity: newQuantity }));
  } else {
    toast.error("Quantity cannot be less than 1");
  }
};

  // Dynamic Calculation Logic
  const subTotal = cartItems.reduce((sum, item) => sum + parseInt(item.originalPrice) * parseInt(item.quantity), 0);
  const discount = cartItems.reduce((sum, item) => sum + parseInt(item.discount) * parseInt(item.quantity), 0);
  const deliveryCharge = subTotal > 1000 ? 0 : subTotal > 500 ? 50 : 60;
  const orderTotal = subTotal - discount + deliveryCharge;

if (error) return <Error errorMessage={error}/>

  return (
    <div className="cartHero">
      <div className="mainSection">
        <div className="cartSection">
          <div className="container">
            <div className="cartHeading">
              <span>Shopping Cart</span>
              <p>Home / Cart</p>
            </div>
            <table className="table table-xs">
              <thead>
                <tr></tr>
              </thead>

              <tbody>

                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <tr className="item-row" key={item.bookId}>
                      <td>
                        <img
                          src={item.primaryImageUrl}
                          alt={item.title}
                          className="cartItemImage"
                        />
                      </td>
                      
                      <td>

                      <img
                          src={item.primaryImageUrl}
                          alt={item.title}
                          className="cartItemImageDevice"
                        />
                        
                          <span className="cartTitle">{item.title} < br/> ₹ {item?.originalPrice}<span  className="deviceQty"><Button className="qtyDeviceBtn" onClick={()=>handleDecrement(item.cartId,item.quantity)}>-</Button><span>{item?.quantity || 1}</span> <Button className="qtyDeviceBtn" onClick={()=>handleIncrement(item.cartId,item.quantity)}>+</Button> </span></span><br />
                          <span className="deviceTotal"><span>₹ {parseInt(item?.originalPrice) * parseInt(item?.quantity)} </span><MdOutlineDelete onClick={()=>handleDelete(item?.cartId)} className="deleteButton"/></span>
                      </td>
                      <td className="text-right cartCount" title="Amount">
                        <Button onClick={()=>handleDecrement(item.cartId,item.quantity)}>-</Button><span>{item?.quantity || 1}</span><Button onClick={()=>handleIncrement(item.cartId,item.quantity)}>+</Button>
                      </td>
                      {/* <td className="text-right" title="Price">
                        ₹ {item?.originalPrice}
                      </td> */}
                      <td className="text-right notInDevice" title="Total">
                        ₹ {parseInt(item?.originalPrice) * parseInt(item?.quantity)}
                      </td>
                      <td className="notInDevice">
                        <MdOutlineDelete onClick={()=>handleDelete(item?.cartId)} className="deleteButton"/>
                      </td>
                    </tr>
                  ))
                ) : loading ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No items in the cart.
                    </td>
                  </tr>
                ) : ''}
              </tbody>
            </table>
          </div>
        </div>
        <div className="checkoutSection">
          <div className="checkoutHead">
            <h2 className="checkoutTitle">Order Summary</h2>
            <table className="checkoutTable">
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td className="price">₹ {subTotal} /-</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td className="price">₹ {discount} /-</td>
                </tr>
                <tr>
                  <td>Delivery Charge</td>
                  <td className="price">₹ {deliveryCharge} /-</td>
                </tr>
                <tr className="totalRow">
                  <td>
                    <strong>Order Total</strong>
                  </td>
                  <td className="price">
                    <strong>₹ {orderTotal} /-</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="placeOrderButton">Place order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
