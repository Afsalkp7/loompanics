import { useEffect } from "react";
import "./cart.css";
import { MdOutlineDelete } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, fetchCartItems } from "../../redux/cartSlice";
import Error from "../layout/Error";

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
                        
                          <span className="cartTitle">{item.title} < br/> ₹ {item?.originalPrice}<span  className="deviceQty"> <Button className="qtyDeviceBtn">+</Button><span>{item?.quantity || 1}</span><Button className="qtyDeviceBtn">-</Button> </span></span><br />
                          <span className="deviceTotal"><span>₹ {parseInt(item?.originalPrice) * parseInt(item?.quantity)} </span><MdOutlineDelete onClick={()=>handleDelete(item?.cartId)} className="deleteButton"/></span>
                      </td>
                      <td className="text-right cartCount" title="Amount">
                        <Button>+</Button><span>{item?.quantity || 1}</span><Button>-</Button>
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
                  <td className="price">₹ 988 /-</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td className="price">₹ 100 /-</td>
                </tr>
                <tr>
                  <td>Delivery Charge</td>
                  <td className="price">₹ 40 /-</td>
                </tr>
                <tr className="totalRow">
                  <td>
                    <strong>Order Total</strong>
                  </td>
                  <td className="price">
                    <strong>₹ 928 /-</strong>
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
