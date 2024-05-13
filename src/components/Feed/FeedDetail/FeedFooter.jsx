import React from 'react'

import share from '../../../assets/feedFooter/share.svg';
import scrab from '../../../assets/feedFooter/scrab.svg';
function FeedFooter({handleFeedState,handleContentSizeUpDown,feedState}) {
  return (
    <div className='feedDetail-footer-wrap'>
        <div className='letter-wrap' onClick={handleContentSizeUpDown}>
          <span className='small-letter'>가</span>
          <span className='big-letter'>가</span>
        </div>
        <div className='feedDetail-footer-button-wrap'>
          <button className={`${feedState ? '' : 'active'}`} onClick={handleFeedState}>
            원문view
          </button>
          <button className={`${feedState ? 'active' : ''}`} onClick={handleFeedState}>
            요약view
          </button>
        </div>
        <div className='feedDetail-footer-image-wrap'>
          <img src={share} className='feedDetail-footer-image' alt='share-image'/>
          <img src={scrab} className='feedDetail-footer-image' alt='scrab-image'/>
        </div>
    </div>
  )
}

export default FeedFooter