import React from 'react'
import './summery.css'
import { useNavigate } from 'react-router-dom'
import API from '../../utils/api'
const Summery = ({subTotal,discount,deliveryCharge,orderTotal,buttonType,buttonLocation,address=null,productId=null}) => {
    const navigate = useNavigate()

    const handleButtonClick = async () => {
      
      if (buttonType == "Place order" && address) {

        
        try {

          const payload = {
            addressId:address,
            ...(productId != null && { productId }),
          };
          
          
          const response = await API.post('/order', payload);
  
          const data = response.data
          console.log(data);
          
          navigate(`/orderstatus/${data.order.orderedItems[data.order.orderedItems.length-1]._id}`);
        } catch (error) {
          console.error('Error creating order:', error);
        }
      } else if (buttonType !== "Place Order") {
        navigate(buttonLocation);
      }
    };
  return (
    <div className="checkoutHead">
            <h2 className="checkoutTitle">Order Summary</h2>
            <table className="checkoutTable">
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td className="price">₹ {subTotal} </td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td className="price">₹ {discount} </td>
                </tr>
                <tr>
                  <td>Delivery Charge</td>
                  <td className="price">₹ {deliveryCharge} </td>
                </tr>
                <tr className="totalRow">
                  <td>
                    <strong>Order Total</strong>
                  </td>
                  <td className="price">
                    <strong>₹ {orderTotal} </strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className={`placeOrderButton ${address != null || buttonType == "Checkout" ? "" : "buttonDisable"}`} onClick={handleButtonClick}>{buttonType}</button>
          </div>
  )
}

export default Summery