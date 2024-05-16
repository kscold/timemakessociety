// import React, { useState } from 'react';
// import Tms from '../../assets/start/TmsLogo.svg';
// import { useNavigate } from 'react-router-dom';

// function Start() {
//     const [loginState,setLoginState] = useState(false)
//     const navigate = useNavigate()
//     const handleLogin = () => {
//         setLoginState(!loginState)
//         navigate('/login')
//     }
//     const handleSignup = () => {
//       setLoginState(!loginState)
//       navigate('/signup')
//   }

//   return (
//     <div className='start-wrap'>
//         <img src={Tms} className='start-logo' alt='Tms-image' />
//         <button type='button' className='login-button' onClick={handleLogin}>로그인</button>
//         <button type='button' className='signup-button' onClick={handleSignup}>회원가입</button>
//     </div>
//   )
// }

// export default Start

import React, { useState } from "react"
import Tms from "../../assets/start/TmsLogo.svg"
import { useNavigate } from "react-router-dom"

function Start() {
  const [loginState, setLoginState] = useState(false)
  const navigate = useNavigate()

  // 설치 이벤트 핸들러
  const handleInstallPWA = () => {
    if ("deferredPrompt" in window) {
      // PWA 설치 이벤트를 트리거합니다.
      window.deferredPrompt.prompt()
      // 사용자가 설치를 선택하거나 취소할 때까지 대기합니다.
      window.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("사용자가 PWA를 설치했습니다.")
        } else {
          console.log("사용자가 PWA 설치를 거부했습니다.")
        }
        // 이벤트 창을 다시 초기화합니다.
        window.deferredPrompt = null
      })
    }
  }

  // 로그인 또는 회원가입 버튼 클릭 핸들러
  const handleButtonClick = () => {
    setLoginState(!loginState)
    // 시작 페이지에서 버튼 클릭 시 PWA 설치 이벤트를 트리거합니다.
    handleInstallPWA()
    // 로그인 또는 회원가입 페이지로 이동합니다.
    navigate(loginState ? "/signup" : "/login")
  }

  return (
    <div className="start-wrap">
      <img src={Tms} className="start-logo" alt="Tms-image" />
      {/* 로그인 또는 회원가입 버튼 */}
      <button
        type="button"
        className="login-button"
        onClick={handleButtonClick}
      >
        로그인
      </button>
      <button
        type="button"
        className="signup-button"
        onClick={handleButtonClick}
      >
        회원가입
      </button>
      <button
        type="button"
        className="install-button"
        onClick={handleInstallPWA}
      >
        앱으로 실행하기
      </button>
    </div>
  )
}

export default Start
