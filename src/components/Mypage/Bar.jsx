import React, { useEffect } from 'react'

import infoCircle from '../../assets/mypage/info-circle-line.svg';
function Bar({readTimeBar,setReadTimeBar,userInfo,dummydata}) {
  // const convertReadTime = (time)=>{
  //   const [hour,minutes,seconds] = time.split(':');
  //   const totalTime = parseInt(hour)*3600 + parseInt(minutes)*60 + parseInt(seconds)
    
  //   return totalTime
  // }
  // const updatedReadTime =()=>{
  //   let totalTime = readTimeBar.map((item)=>({
  //     ...item,
  //     time:convertReadTime(item.time),
  //   }))
  //   setReadTimeBar(totalTime);
  // }
  // useEffect(()=>{
  //   updatedReadTime();
  // },[])
  // console.log
  if(!userInfo){
    return <div>loading...</div>
  }
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
                <span className='bar'>{data.time}</span>
                <span className='date'>{data.category}</span>
              </div>
          ))}
        </div>
      </div>
  )
}

export default Bar