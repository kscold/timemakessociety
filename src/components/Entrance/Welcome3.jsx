import React from 'react'
import tms from '../../assets/main/T_M_S.svg';
function Welcome3({ userInfo }) {
    return (
        <div className='welcome3-wrap'>
            <span className='tms' style={{ backgroundImage: `url(${tms})` }} />
            <p className='username'>{userInfo?.memberNickname}<span>님</span></p>
            <p>버려지는 시간, <br />TMS가 챙겨드려요!</p>
            <p>기사 읽을 준비 되셨나요?</p>
        </div>
    )
}

export default Welcome3