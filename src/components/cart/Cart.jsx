import { useEffect, useState } from "react";
import "./cart.css";
import API from "../../utils/api";
const Cart = () => {

  const [cartItems,setCartItems] = useState([])

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await API.get("/cart");
        if (response.status === 200) {
          setCartItems(response.data.cartItems);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

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
      <tr>
        
      </tr>
    </thead>
    
    <tbody>
    
      {/* <tr className="item-row">
        <td>
          <img src="http://localhost:5173/src/assets/logo_without_bg.png" alt="Item 1" />
        </td>
        <td>
          <p><strong>Item 1</strong></p>
        </td>
        <td className="text-right cartCount" title="Amount">
        <div className="increment"> + </div>3<div className="decrement"> - </div></td>
        <td className="text-right" title="Price">2.00</td>
        <td className="text-right" title="Total">6.00</td>
      </tr> */}

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
                        <p>
                          <strong>{item.title}</strong>
                        </p>
                      </td>
                      <td className="text-right cartCount" title="Amount">
                        <div className="increment"> + </div>
                        {item.quantity}
                        <div className="decrement"> - </div>
                      </td>
                      <td className="text-right" title="Price">
                        ₹ {item.originalPrice}
                      </td>
                      <td className="text-right" title="Total">
                        ₹ {item.originalPrice * item.quantity}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No items in the cart.
                    </td>
                  </tr>
                )}


      <tr className="total-row info">
        <td className="text-right" colSpan="4">Total</td>
        <td className="text-right">18.00</td>
      </tr>
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
        <td><strong>Order Total</strong></td>
        <td className="price"><strong>₹ 928 /-</strong></td>
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
