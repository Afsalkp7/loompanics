import "./FormHead.css";
import logoWithBg from "../../../assets/logo_without_bg.png";
import React from "react";
import AuthForm from "../authForm/AuthForm.jsx";
import Forgot from "../authForm/Forgot.jsx";
import OtpBox from "../authForm/OtpBox.jsx";
import ChangePassword from "../authForm/ChangePassword.jsx";

function FormHead({
  isForgot,
  setIsForgot,
  isRegister,
  setIsRegister,
  isOtpSended,
  setIsOtpSended,
  needToChange,
  setNeedToChange,
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
              : needToChange
              ? "Reset password"
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
              : needToChange
              ? "Enter a new password"
              : "Create new account to explore Loompanics"}
          </span>
        </div>
        {isForgot ? (
          <Forgot
            isForgot={isForgot}
            setIsForgot={setIsForgot}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            isOtpSended={isOtpSended}
            setIsOtpSended={setIsOtpSended}
            needToChange={needToChange}
            setNeedToChange={setNeedToChange}
          />
        ) : isOtpSended ? (
          <OtpBox
            isForgot={isForgot}
            setIsForgot={setIsForgot}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            isOtpSended={isOtpSended}
            setIsOtpSended={setIsOtpSended}
            needToChange={needToChange}
            setNeedToChange={setNeedToChange}
          />
        ) : needToChange ? (
          <ChangePassword
            isForgot={isForgot}
            setIsForgot={setIsForgot}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            isOtpSended={isOtpSended}
            setIsOtpSended={setIsOtpSended}
            needToChange={needToChange}
            setNeedToChange={setNeedToChange}
          />
        ) : (
          <AuthForm
            isForgot={isForgot}
            setIsForgot={setIsForgot}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            isOtpSended={isOtpSended}
            setIsOtpSended={setIsOtpSended}
            needToChange={needToChange}
            setNeedToChange={setNeedToChange}
          />
        )}
      </div>
    </div>
  );
}

export default FormHead;
