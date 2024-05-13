import React from 'react';

import modified from '../../assets/mypage/modified.svg';
import profileimage from '../../assets/playing-guitar.png';
function Profile({ userInfo,handleLogout }) {
  if(!userInfo){
    return <div>Loading...</div>
  }
  return (
    <div className='profile-wrap'>
     
      <span className='profile-image' style={{backgroundImage:`url(${profileimage})`}}/>

      <div className='profile-nickname-box-wrap'>
        <div className='profile-nickname-wrap'>
          <div className='profile-name-wrap'>
            <h2>{userInfo.memberName}</h2>
            <img src={modified} alt='modified-image' />
          </div>
          <p>{userInfo.memberNickname}</p>
        </div>

        <button className='logout' onClick={handleLogout}>로그아웃</button>
      </div>

    </div>
  )
}

export default Profile