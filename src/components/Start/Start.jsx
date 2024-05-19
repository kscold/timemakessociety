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

// import React, { useState, useEffect } from "react"
// import Tms from "../../assets/start/TmsLogo.svg"
// import { useNavigate } from "react-router-dom"
// import IosModal from "../Modal/IosModal"

// function Start() {
//   const [loginState, setLoginState] = useState(false)
//   const navigate = useNavigate()
//   const [deferredPrompt, setDeferredPrompt] = useState(null)
//   const [isiOS, setIsiOS] = useState(false)
//   const [showModal, setShowModal] = useState(false)

//   // iOS 확인
//   useEffect(() => {
//     const userAgent = window.navigator.userAgent.toLowerCase()
//     const isIOSDevice = /iphone|ipad|ipod/.test(userAgent)
//     setIsiOS(isIOSDevice)

//     const handleBeforeInstallPrompt = (e) => {
//       e.preventDefault()
//       setDeferredPrompt(e)
//     }

//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

//     return () => {
//       window.removeEventListener(
//         "beforeinstallprompt",
//         handleBeforeInstallPrompt
//       )
//     }
//   }, [])

//   // PWA 설치 이벤트 핸들러
//   const handleInstallPWA = () => {
//     if (deferredPrompt) {
//       deferredPrompt.prompt()
//       deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === "accepted") {
//           console.log("사용자가 PWA를 설치했습니다.")
//         } else {
//           console.log("사용자가 PWA 설치를 거부했습니다.")
//         }
//         setDeferredPrompt(null)
//       })
//     } else if (isiOS) {
//       setShowModal(true) // iOS 기기에서 모달을 표시합니다.
//     }
//   }

//   // 로그인 또는 회원가입 버튼 클릭 핸들러
//   const handleButtonClick = (path) => {
//     navigate(path)
//   }

//   return (
//     <div className="start-wrap">
//       <img src={Tms} className="start-logo" alt="Tms-image" />
//       <button
//         type="button"
//         className="login-button"
//         onClick={() => handleButtonClick("/login")}
//       >
//         로그인
//       </button>
//       <button
//         type="button"
//         className="signup-button"
//         onClick={() => handleButtonClick("/signup")}
//       >
//         회원가입
//       </button>
//       <button
//         type="button"
//         className="install-button"
//         onClick={handleInstallPWA}
//         disabled={!deferredPrompt && !isiOS} // deferredPrompt와 isiOS가 모두 없을 때 버튼 비활성화
//       >
//         앱으로 실행하기
//       </button>
//       <IosModal show={showModal} onClose={() => setShowModal(false)} />
//     </div>
//   )
// }

// export default Start

import React, { useState, useEffect } from "react"
import Tms from "../../assets/start/TmsLogo.svg"
import { useNavigate } from "react-router-dom"
import IosModal from "../Modal/IosModal"
import { browserName } from "react-browser-detection"

function Start() {
  const [loginState, setLoginState] = useState(false)
  const navigate = useNavigate()
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isiOS, setIsiOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isChrome, setIsChrome] = useState(false)
  const [isPWA, setIsPWA] = useState(false)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent)
    const isAndroidDevice = /android/.test(userAgent)

    setIsiOS(isIOSDevice)
    setIsAndroid(isAndroidDevice)

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // PWA 실행 여부 확인
    const checkPWA = () => {
      const isInStandaloneMode =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone
      setIsPWA(isInStandaloneMode)
    }

    checkPWA()

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      )
    }
  }, [])

  useEffect(() => {
    // Check if the browser is Chrome
    setIsChrome(browserName === "Chrome")
  }, [])

  // PWA 설치 이벤트 핸들러
  const handleInstallPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("사용자가 PWA를 설치했습니다.")
        } else {
          console.log("사용자가 PWA 설치를 거부했습니다.")
        }
        setDeferredPrompt(null)
      })
    } else if (isiOS || (isAndroid && !isChrome)) {
      setShowModal(true) // iOS 또는 비Chrome Android 기기에서 모달을 표시합니다.
    }
  }

  // 로그인 또는 회원가입 버튼 클릭 핸들러
  const handleButtonClick = (path) => {
    navigate(path)
  }

  return (
    <div className="start-wrap">
      <img src={Tms} className="start-logo" alt="Tms-image" />
      <button
        type="button"
        className="signup-button"
        onClick={() => handleButtonClick("/login")}
      >
        로그인
      </button>
      <button
        type="button"
        className="signup-button"
        onClick={() => handleButtonClick("/signup")}
      >
        회원가입
      </button>
      {!isPWA && (
        <button
          type="button"
          className="install-button"
          onClick={handleInstallPWA}
          disabled={!deferredPrompt && !(isiOS || (isAndroid && !isChrome))} // deferredPrompt와 isiOS가 모두 없을 때 버튼 비활성화
        >
          앱으로 연결
        </button>
      )}
      <IosModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}

export default Start
