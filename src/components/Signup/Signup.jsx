import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import backward from "../../assets/backward.svg"
import idimg from "../../assets/signup/id-img.svg"
import pwimg from "../../assets/signup/pw-img.svg"
import nameimg from "../../assets/signup/name-img.svg"
import phoneimg from "../../assets/signup/phone-img.svg"

function Signup() {
  const [userInfo, setUserInfo] = useState({
    loginId: "",
    password: "",
    memberName: "",
    memberNickname: "",
    email: "",
    verificationCode: "",
  })
  const [isData, setIsData] = useState(true)
  const [isEmptyState, setIsEmptyState] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [verificationMessage, setVerificationMessage] = useState("") // 상태 추가
  const navigate = useNavigate()

  const handleInputChange = (identifier, value) => {
    setUserInfo((preValue) => ({
      ...preValue,
      [identifier]: value,
    }))
  }

  const handleEmailSend = async () => {
    if (!userInfo.email) {
      setVerificationMessage("이메일을 입력해주세요.")
      return
    }
    try {
      const response = await axios.post("/api/members/mail", {
        email: userInfo.email,
      })
      console.log(response)
      if (response.status === 200) {
        setEmailSent(true)
        setVerificationMessage(
          "인증 코드가 전송되었습니다. 이메일을 확인해주세요."
        )
      } else if (response.status === 400) {
        setVerificationMessage("이메일이 올바르지 않습니다.")
      }
    } catch (error) {
      setVerificationMessage("이메일 전송에 실패하였습니다.")
    }
  }

  const handleVerification = async () => {
    try {
      const response = await axios.post("/api/members/verify", {
        email: userInfo.email,
        code: userInfo.verificationCode,
      })
      if (response.status === 200) {
        setVerificationComplete(true)
        setVerificationMessage("인증되었습니다.")
      } else {
        setVerificationMessage("인증 코드가 올바르지 않습니다.")
      }
    } catch (error) {
      setVerificationMessage("인증에 실패하였습니다.")
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const isEmpty =
      userInfo.loginId === "" ||
      userInfo.password === "" ||
      userInfo.memberName === "" ||
      userInfo.memberNickname === "" ||
      userInfo.email === "" ||
      !verificationComplete

    if (isEmpty) {
      setIsData(true)
      setIsEmptyState(true)
    } else {
      try {
        const response = await axios.post("/api/members/signup", {
          loginId: userInfo.loginId,
          password: userInfo.password,
          memberName: userInfo.memberName,
          memberNickname: userInfo.memberNickname,
          email: userInfo.email,
        })
        console.log(response.data)
        navigate("/login")
      } catch (error) {
        new Error(error)
        setIsEmptyState(false)
        setIsData(false)
      }
    }
  }

  const handleBackward = () => {
    navigate("/")
  }

  return (
    <>
      <div className="signup-header-wrap">
        <img
          src={backward}
          alt="backward"
          onClick={handleBackward}
          className="backward"
        />
        <h1 className="signup-header">회원가입</h1>
      </div>
      <form onSubmit={handleSubmit} className="signup-content-wrap">
        <label>아이디</label>
        <input
          placeholder="아이디를 입력해주세요."
          name="loginId"
          onChange={(event) => handleInputChange("loginId", event.target.value)}
          style={{ backgroundImage: `url(${idimg})` }}
        />
        <label>비밀번호</label>
        <input
          placeholder="비밀번호를 입력해주세요."
          name="password"
          type="password"
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
          style={{ backgroundImage: `url(${pwimg})` }}
        />
        <input
          placeholder="비밀번호 확인"
          type="password"
          style={{ backgroundImage: `url(${pwimg})` }}
        />
        <label>이름</label>
        <input
          placeholder="이름을 입력해주세요."
          onChange={(event) =>
            handleInputChange("memberName", event.target.value)
          }
          style={{ backgroundImage: `url(${nameimg})` }}
        />
        <div className="nickname-wrap">
          <label className="nickname-label">닉네임</label>
          {/* <button type='button' className='overlap'>중복확인</button> */}
        </div>
        <input
          placeholder="닉네임을 입력해주세요."
          name="memberNickname"
          onChange={(event) =>
            handleInputChange("memberNickname", event.target.value)
          }
          style={{ backgroundImage: `url(${nameimg})` }}
        />
        <label>메일 인증</label>
        <div className="mail-form">
          <input
            className="mail-input"
            placeholder="이메일을 입력해주세요."
            name="email"
            disabled={emailSent}
            onChange={(event) => handleInputChange("email", event.target.value)}
            style={{
              backgroundColor: emailSent ? "lightgrey" : "white",
            }}
          />
          <button
            type="button"
            className="mail-button"
            onClick={handleEmailSend}
            disabled={emailSent}
          >
            전송
          </button>
        </div>
        {verificationMessage && (
          <p className={emailSent ? "success-p" : "error-p"}>
            {verificationMessage}
          </p>
        )}
        {emailSent && (
          <>
            <label>인증 코드</label>
            <input
              className="verification-input"
              placeholder="인증 코드를 입력해주세요."
              name="verificationCode"
              onChange={(event) =>
                handleInputChange("verificationCode", event.target.value)
              }
              style={{ backgroundImage: `url(${phoneimg})` }}
            />
            <button
              type="button"
              className="signup-button"
              onClick={handleVerification}
            >
              인증
            </button>
          </>
        )}
        {isData ? "" : <p className="isData">이미 있는 이름과 아이디입니다.</p>}
        {isEmptyState ? (
          <p className="isData">모든 정보를 기입해주세요.</p>
        ) : (
          ""
        )}
        <button type="submit" className="signup-button">
          가입하기
        </button>
      </form>
    </>
  )
}

export default Signup
