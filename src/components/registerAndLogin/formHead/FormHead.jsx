import React, { useState } from "react";
import "./FormHead.css";
import logoWithBg from "../../../assets/logo_without_bg.png";
import AuthForm from "../authForm/AuthForm.jsx";
import Forgot from "../authForm/Forgot.jsx";
import OtpBox from "../authForm/OtpBox.jsx";
import ChangePassword from "../authForm/ChangePassword.jsx";

function FormHead() {
  const [isForgot, setIsForgot] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isOtpSended, setIsOtpSended] = useState(false);
  const [needToChange, setNeedToChange] = useState(false); // Define setNeedToChange

  const [email, setEmail] = useState("");

  const handleOtpVerificationSuccess = () => {
    setIsOtpSended(false); // Hide OTP box
    setNeedToChange(false); // Ensure that password reset state is hidden
    setIsForgot(false); // Ensure forgot state is hidden
    setIsRegister(false); // Ensure register state is hidden
  };

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
        {isOtpSended ? (
          <OtpBox
            isForgot={isForgot}
            setIsForgot={setIsForgot}
            isOtpSended={isOtpSended}
            setIsOtpSended={setIsOtpSended}
            needToChange={needToChange}
            setNeedToChange={setNeedToChange}
            email={email}
            setEmail={setEmail}
            onOtpVerificationSuccess={handleOtpVerificationSuccess} // Pass callback
          />
        ) : needToChange ? (
          <ChangePassword
            email={email}
            isForgot={isForgot}
            setIsForgot={setIsForgot}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            isOtpSended={isOtpSended}
            setIsOtpSended={setIsOtpSended}
            needToChange={needToChange}
            setNeedToChange={setNeedToChange}
          />
        ) :
        isForgot ? (
          <Forgot
            isForgot={isForgot}
            setIsForgot={setIsForgot}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            isOtpSended={isOtpSended}
            setIsOtpSended={setIsOtpSended}
            needToChange={needToChange}
            setNeedToChange={setNeedToChange}
            setEmail={setEmail}
          />
        ) :  (
          <AuthForm
            isForgot={isForgot}
            setIsForgot={setIsForgot}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            isOtpSended={isOtpSended}
            setIsOtpSended={setIsOtpSended}
            needToChange={needToChange}
            setNeedToChange={setNeedToChange}
            setEmail={setEmail}
          />
        )}
      </div>
    </div>
  );
}

export default FormHead;
