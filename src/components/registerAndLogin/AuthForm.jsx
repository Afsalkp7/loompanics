import './AuthForm.css'
import logoWithBg from '../../../public/logo_without_bg.png'
import React from 'react'


function AuthForm() {
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
        </div>
    </div>
  )
}

export default AuthForm