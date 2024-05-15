import React from 'react'
import tms from '../../assets/main/T_M_S.svg';
function Welcome({userInfo}) {
    return (
        <div className='entrance-wrap'>
            <img src={tms} className='tms' alt='read-news-image' />
            <p className='welcome'>환영합니다!</p>
            <p className='username'>{userInfo?.memberNickname}</p>
        </div>
    )
}

export default Welcome