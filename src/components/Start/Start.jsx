import React, { useState } from 'react';
import Tms from '../../assets/start/TmsLogo.svg';
import { useNavigate } from 'react-router-dom';

function Start() {
    const [loginState,setLoginState] = useState(false)
    const navigate = useNavigate()
    const handleLogin = () => {
        setLoginState(!loginState)
        navigate('/login')
    }
    const handleSignup = () => {
      setLoginState(!loginState)
      navigate('/signup')
  }
    
  return (
    <div className='start-wrap'>
        <img src={Tms} className='start-logo' alt='Tms-image' />
        <button type='button' className='login-button' onClick={handleLogin}>로그인</button>
        <button type='button' className='signup-button' onClick={handleSignup}>회원가입</button>
    </div>
  )
}

export default Start