import React from 'react'

import infoCircle from '../../assets/mypage/info-circle-line.svg';
function Bar({userInfo,dummydata}) {
  if(!userInfo){
    return <div>loading...</div>
  }
  return (
    <div className='statistics-bar-wrap'>
        <div className='statistics-header-wrap'>
          <div className='header-title'>
            <p>{userInfo.memberName}님은</p>
            <p> <span className='time'>{userInfo.totalReadTime}</span> 절약했어요!</p>
          </div>
          <img src={infoCircle} alt='infoCircle-image' />
        </div>
        <div className='bar-wrap'>
          {dummydata.map((data,index)=>(
             <div key={index} className='individual-wrap'>
                <span className='bar'>{data.summary}</span>
                <span className='date'>{data.date}</span>
              </div>
          ))}
        </div>
      </div>
  )
}

export default Bar