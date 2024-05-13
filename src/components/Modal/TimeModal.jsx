import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Start from '../../assets/common/start.png';
import { timerActions } from '../../store/count';
import { useNavigate } from 'react-router-dom';
function TimeModal() {
    const dispatch = useDispatch();
    const timer = useSelector(state => state.timer.modifiedTimer)
    const isRunning = useSelector(state => state.timer.running) 
    const [miunte,setMinute] = useState();
    const [second,setSecond] = useState();
    const navigate = useNavigate();
    const timeFormat = () => {
      const min = Math.floor(timer / 60);
      const sec = timer % 60;
      setMinute(min);
      setSecond(sec);
    }
    const handleModal=()=>{
      if (isRunning){
        dispatch(timerActions.stopTimer())
      }
      else{
        dispatch(timerActions.startTimer())
      }
    }
    useEffect(()=>{
      const id =setInterval(()=>{
        dispatch(timerActions.tick())
      },1000);
      
      if(timer===0){
        clearInterval(id);
        dispatch(timerActions.stopTimer())
        // 시간 만료되면 자동 로그아웃 기능 추가해야함
      
      }
      //timeFormat()
      return () => clearInterval(id);
    },[isRunning,dispatch])
    useEffect(()=>{
      timeFormat();
      if (timer===0){
        navigate('/timeout')
      }
    } , [timer])
    
    //console.log("timer: ", timer)
  return (
    <div className='timemodal-wrap' onClick={handleModal}>
        <span className='timemodal-bar'>
          <span className='timemodal-time' >{isRunning ?`${miunte}:${second}` : <img src={Start} style={{width:'20px'}}/>}</span>
        </span>
    </div>
  )
}

export default TimeModal