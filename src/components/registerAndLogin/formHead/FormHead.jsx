import "./FormHead.css";
import logoWithBg from "../../../assets/logo_without_bg.png";
import React from "react";
import AuthForm from "../authForm/AuthForm.jsx";
import Forgot from "../authForm/Forgot.jsx";
import OtpBox from "../authForm/OtpBox.jsx";

function FormHead({
  isForgot,
  setIsForgot,
  isRegister,
  setIsRegister,
  isOtpSended,
  setIsOtpSended,
}) {
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
          <span>
            {isRegister
              ? "Welcome"
              : isForgot
              ? "Find your account..."
              : isOtpSended
              ? "Verification"
              : "Welcome Back!"}
          </span>
        </div>
        <div className="message">
          <span>
            {!isRegister
              ? "Sign in to continue to Loompanics book store"
              : isForgot
              ? "Enter your email and we send a OTP to reset your password"
              : isOtpSended
              ? "Check your E-mail for OTP"
              : "Create new account to explore Loompanics"}
          </span>
        </div>
        {isForgot ? (
          <Forgot
            isForgot={isForgot}
            setIsForgot={setIsForgot}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            isOtpSended = {isOtpSended}
            setIsOtpSended={setIsOtpSended}
          />
        ):isOtpSended?
          <OtpBox 
            isForgot={isForgot}
            setIsForgot={setIsForgot}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            isOtpSended = {isOtpSended}
            setIsOtpSended={setIsOtpSended}
          
          />
        : (
          <AuthForm
            isForgot={isForgot}
            setIsForgot={setIsForgot}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            isOtpSended = {isOtpSended}
            setIsOtpSended={setIsOtpSended}
          />
        )}
      </div>
    </div>
  );
}

export default FormHead;
