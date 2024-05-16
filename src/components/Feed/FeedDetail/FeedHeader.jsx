import React from 'react'

import backward from '../../../assets/backward.svg';
import foreward from '../../../assets/foreward.svg';
import { Link } from 'react-router-dom';
function FeedHeader({ name,id, commentState, handleGoBack }) {
    return (
        <div className={`${commentState ? 'feedDetail-header-wrap active' : 'feedDetail-header-wrap'}`}>
            <img src={backward} className='image' alt='backward-image' onClick={handleGoBack} />
            <p className='feedDetail-headername'>{name}</p>
            <Link to={`/similar/${name}/${id}`}>
                <div className='foreward-wrap'>
                    <p className='feedDetail-headername'>유사도</p>
                    <img src={foreward} className='image-foreward' />
                </div>
            </Link>

        </div>
    )
}

export default FeedHeader