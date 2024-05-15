import React from 'react'

import backward from '../../../assets/backward.svg';
function FeedHeader({name,commentState,handleGoBack}) {
    return (
        <div className={`${commentState ? 'feedDetail-header-wrap active' : 'feedDetail-header-wrap'}`}>
            <img src={backward} className='backward' alt='backward-image' onClick={handleGoBack}/>
            <p className='feedDetail-headername'>{name}</p>
        </div>
    )
}

export default FeedHeader