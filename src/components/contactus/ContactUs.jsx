import React from 'react'
import './contactus.css'
import { MdLocationPin, MdOutlineCall, MdOutlineMailOutline } from 'react-icons/md'
import { IoIosGlobe } from 'react-icons/io'

import logo from '../../assets/logo_without_bg.png'
function ContactUs() {
  return (
    <>
      <div className="contactMain">
        <div className="contactHero">
          Contact Us <br />
          <span className="contactSubHeading">Home &gt; Contact Us</span>
        </div>
      </div>
      <div className="contact">
        <div className="contactLeft">
            <div className="loompanicsSection">
                <img className="loompanicsImage" alt="logo image" src={logo}  />
                <div className="loompanicsLinks">
                    <span className="loompanicsName">Loompanics Online Books Store</span>
                    <span className="loompanicsDetail">Since July 2017</span><br />
                    <ul>
                        <li><MdOutlineCall /><span></span></li>
                        <li><MdOutlineMailOutline /></li>
                        <li><IoIosGlobe /></li>
                        <li><MdLocationPin /></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="contactRight">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat sunt eos culpa. Adipisci obcaecati ducimus quia commodi atque pariatur voluptatem tenetur natus, voluptatum aut reiciendis, ullam, iusto consequuntur laboriosam illo.</div>
      </div>
    </>
  )
}

export default ContactUs