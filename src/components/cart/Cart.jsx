import './cart.css'
const Cart = () => {
  return (
    <div className="cartHero">
      <div className="cartHeading">
        <span>Shopping Cart</span>
        <p>Home / Cart</p>
      </div>
      <hr />
      <div className="mainSection">
        <div className="cartSection">
          <div className="cartItem">
            <div className="cartImage">
              <img src='http://localhost:5173/src/assets/logo_without_bg.png' />
            </div>
            <div className="itemTitle">
              <span className='title'>Sample</span><br />
              <span className='titleAuthor'>Author</span><br />
              
            </div>
            <span className='titleAmount'>₹ 499 /-</span>
            <div className="cartCount">
              <div className="increment"> + </div>
              <span>2</span>
              <div className="decrement"> - </div>
            </div>
            <div className="amountSection">
              <div className="amount">
                <span>₹ 988 /-</span>
              </div>
              <div className="remove">
                delete
              </div>
            </div>
          </div>
        </div>
        <div className="checkoutSection">
          <div className="checkoutHead">
            <span className='checkoutTitle'>Order Summery</span>
            <div className="subTotal">
              <span>Subtotal</span>
              <span>₹ 988 /-</span>
            </div>
            <div className="discound">
              <span>Discount</span>
              <span>₹ 100 /-</span>
            </div>
            <div className="delivery">
              <span>Delivery Charge</span>
              <span>₹ 40 /-</span>
            </div>
            <div className="total">
              <span>Order total</span>
              <span>₹ 928 /-</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
