import React, { useState } from 'react'
import FormHead from '../formHead/FormHead'
import AuthForm from '../authForm/AuthForm.jsx';

function UserAuth() {
    const [isRegister,setIsRegister] = useState(false)
    const [isForgot,setIsForgot] = useState(false)
  return (
    <>
        <FormHead isForgot={isForgot} setIsForgot={setIsForgot} isRegister={isRegister} setIsRegister={setIsRegister}/>
    </>
  )
}

export default UserAuth