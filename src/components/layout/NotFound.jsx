import React from 'react'
import './notfound.css'
import notFousImage from '../../assets/404.jpg'
import { IoHomeOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate()
  return (
    <div className='notFoundMain'>
        <img src={notFousImage} alt='not found' />
        <button onClick={()=>navigate("/")} className='toHomeButton'><span className='homeIcon'><FaArrowLeft /><IoHomeOutline /></span><span>Back To Home</span></button>
    </div>
  )
}

export default NotFound