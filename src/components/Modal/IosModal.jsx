import React from "react"

const IosModal = ({ show, onClose }) => {
  if (!show) {
    return null
  }

  return (
    <div className="modal-container">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-h2">iOS 및 수동 앱 설치</h2>
        <img
          src="/ios_pwa.jpg"
          alt="iOS PWA 설치 안내"
          style={{
            maxWidth: "100vw",
            height: "auto",
            marginBottom: "1rem",
            borderRadius: "10px",
          }}
        />
        <p className="modal-text">
          <b>※ chrome/safari 사용 권장</b>
          <br />
          브라우저에서 '공유'버튼을 누른 다음 '홈 화면에 추가' 또는 '추가'
          버튼을 눌러 홈화면에 추가하세요.
        </p>
      </div>
    </div>
  )
}

export default IosModal
