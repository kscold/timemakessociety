import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { timerActions } from '../../store/count';
import axios from 'axios';
function TimeSet() {
    const [Time, setTime] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const memberId = localStorage.getItem('memberId')
    const handleTime = () => {
        if (Time === 0) {
            alert('시간을 설정해주세요!')
        }
        else {
            dispatch(timerActions.timer(Time))
            dispatch(timerActions.modified())
            localStorage.setItem('timer', Time)
            //-- API 통신 추가 --
            navigate('/loading')
        }

    }
    useEffect(()=>{
        const fetchCategory=async()=>{
            const response = await axios.get(`/api/members/${memberId}/tags`)
            console.log(response.data)
            localStorage.setItem('category',response.data)
        }
        fetchCategory();
    },[])
    const handleStick = (id) => {
        const computedTime = 5 * (12 - id)
        const stringTime = `${computedTime}:00`
        const sticks = document.querySelectorAll('.timeset-stick');
        if (Time === stringTime) {
            sticks.forEach((stick, index) => {
                stick.classList.remove('selected');
            })
            setTime(null)
        }
        else {
            sticks.forEach((stick, index) => {
                if (index >= id) {
                    stick.classList.add('selected');
                }
                else {
                    stick.classList.remove('selected');
                }
            })
            setTime(stringTime);
        }

    };


    const timeSticks = Array.from({ length: 12 }, (_, index) => (
        <div key={index} onClick={() => handleStick(index)} className='timeset-stick' />
    ));


    return (
        <div className='timeset-wrap'>
            <h1>원하는 시간을 설정해 보세요</h1>
            <p>내가 설정한 시간에 따라 뉴스를 요약해줘요</p>
            <p className='time'>{Time ? Time : '0:00'}</p>
            <div className='timeset-stick-wrap'>
                {timeSticks}
            </div>

            <button onClick={handleTime}>계속하기</button>
        </div>
    )
}

export default TimeSet
