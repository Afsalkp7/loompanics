import React from 'react'
import './error.css'
import errorImage from '../../assets/error.png'
function Error({errorMessage}) {
  return (
    <div className='errorMain'>
        <div className="errorDiv">
            <img className='errorImage' src={errorImage} alt='error image' />
            <span className='errorMessage'>{errorMessage}</span>
        </div>
        
    </div>
  )
}

export default Error