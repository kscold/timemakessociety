import React from 'react'
import readNews from '../../assets/entrance/readNews.png';
import tms from '../../assets/main/T_M_S.svg';
function Welcome2() {
    return (
        <div className='welcome2-wrap'>
            <img src={tms} className='tms' alt='tms-image' />
            <p className='description'>출퇴근 · 통학시간 따른<br /> 맞춤형 기사 제공APP</p>
            <span className='read-article-image' style={{ backgroundImage: `url(${readNews})` }} />
        </div>
    )
}

export default Welcome2