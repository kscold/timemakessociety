import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginActions } from '../../store/Login';
function TimeOut() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const timeSticks = Array.from({ length: 12 }, (_, index) => (
        <div key={index} className='timeset-stick' />
    ));
    const handleFinish=()=>{
        localStorage.clear()
        dispatch(loginActions.logout())
        navigate('/')
    }
    return (
        <div className='timeset-wrap'>
            <h1>타임오버</h1>
            <p>절약한 시간: {'2:00'}분</p>
            <p className='time'>{'0:00'}</p>
            <div className='timeset-stick-wrap'>
                {timeSticks}
            </div>

            <button onClick={handleFinish}>끝내기</button>
        </div>
    )
}

export default TimeOut