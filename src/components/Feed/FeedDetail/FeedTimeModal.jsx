import React from 'react'

function FeedTimeModal({formatReadTime}) {
    return (
        <div className='feedDetail-timemodal-all-wrap'>
            <div className='feedDetail-timemodal-wrap'>
                <div className='time-gauge'/>
            <div className='time-wrap'>
                {formatReadTime}
            </div>
            <p>읽는시간 카운트 중..</p>
        </div>
        </div>
        


    )
}

export default FeedTimeModal