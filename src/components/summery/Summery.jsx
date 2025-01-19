import React from 'react'
import './summery.css'
import { useNavigate } from 'react-router-dom'
const Summery = ({subTotal,discount,deliveryCharge,orderTotal,buttonType,buttonLocation}) => {
    const navigate = useNavigate()
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
            <button className="placeOrderButton" onClick={()=>navigate(buttonLocation)}>{buttonType}</button>
          </div>
  )
}

export default Summery