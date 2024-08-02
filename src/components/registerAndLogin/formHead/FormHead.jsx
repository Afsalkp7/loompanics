import './FormHead.css'
import logoWithBg from '../../../assets/logo_without_bg.png'
import React from 'react'
import AuthForm from '../authForm/AuthForm'


function FormHead() {
  return (
    <div className='authFormMain'>
        <div className="authForm">
            <div className="formLogo">
                <img src={logoWithBg} alt="Logo"/>
            </div>
            <div className="companyName">
                <span>LOOMPANICS BOOK STORE</span>
            </div>
            <div className="greeting">
                <span>Welcome Back !</span>
            </div>
            <div className="message">
                <span>Sign in to continue to Loompanics book store</span>
            </div>
            <AuthForm />
        </div>
        
    </div>
  )
}

export default FormHead