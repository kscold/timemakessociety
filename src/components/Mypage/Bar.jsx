import React, { useEffect } from 'react'

import infoCircle from '../../assets/mypage/info-circle-line.svg';
function Bar({readTimeBar,setReadTimeBar,userInfo}) {
  const toStringReadTime =(totalTime)=>{
    if(totalTime>=3600){
      const num = Math.floor(totalTime/3600) 
      return `${num}시간`
    }
    else if(totalTime>=60){
      const num = Math.floor(totalTime/60)
      return `${num}분`
    }
    else{
      return `${totalTime}초`
    }
  }
  if(!userInfo){
    return <div>loading...</div>
  }
  const calculateBarHeight = (time) => {
    if (time === 0) {
      return 10; 
    }
  
    return time;
  };
  return (
    <div className='statistics-bar-wrap'>
        <div className='statistics-header-wrap'>
          <div className='header-title'>
            <p>{userInfo.memberName}님은 총</p>
            <p> <span className='time'>{userInfo.totalReadTime}</span> 절약했어요!</p>
          </div>
          <img src={infoCircle} alt='infoCircle-image' />
        </div>
        <div className='bar-wrap'>
          {readTimeBar?.map((data,index)=>(
             <div key={index} className='individual-wrap'>
                <span className='bar' style={{height:`${calculateBarHeight(data.time)}px`}}>{toStringReadTime(data.time)}</span>
                <span className='date'>{data.category}</span>
              </div>
          ))}
        </div>
      </div>
  )
}

export default Bar