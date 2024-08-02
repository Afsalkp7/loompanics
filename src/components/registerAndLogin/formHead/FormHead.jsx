import './FormHead.css';
import logoWithBg from '../../../assets/logo_without_bg.png';
import React from 'react';
import AuthForm from '../authForm/AuthForm.jsx';
import Forgot from '../authForm/Forgot.jsx';

function FormHead({isForgot,setIsForgot,isRegister,setIsRegister}) {
  return (
    <div className="authFormMain">
      <div className="authForm">
        <div className="formLogo">
          <img src={logoWithBg} alt="Logo" />
        </div>
        <div className="companyName">
          <span>LOOMPANICS BOOK STORE</span>
        </div>
        <div className="greeting">
          <span>{isRegister?'Welcome':'Welcome Back!'}</span>
        </div>
        <div className="message">
          <span >{!isRegister?'Sign in to continue to Loompanics book store':'Create new account to explore Loompanics'}</span>
        </div>
        {isForgot ? <Forgot /> :<AuthForm isForgot={isForgot} setIsForgot={setIsForgot} isRegister={isRegister} setIsRegister={setIsRegister}/>}
        
      </div>
    </div>
  );
}

export default FormHead;
