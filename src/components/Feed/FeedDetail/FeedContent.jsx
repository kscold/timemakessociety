import React, { useState } from 'react'

import like from '../../../assets/feedDetail/like.svg';
import comment from '../../../assets/feedDetail/comment.svg';
import { Link } from 'react-router-dom';
function FeedContent({handleLike,feedContent,feedState,contentSize,commentState,handleComment}) {
  
  return (
    <div className='feedDetail-content-wrap'>
        <p className='feedDetail-content-header'>
          {feedContent.title}
        </p>
        <p className='feedDetail-content-date'>
          입력
          <span style={{ marginLeft: '7px', marginRight: '7px' }}>{feedContent.createdDate}</span>
          
          <span className='feedDetail-content-articlestate'>
            {feedState ? '기사요약' : '기사원문'}
          </span>
        </p>
        <p className='feedDetail-content-reporter'>
          {feedContent.reporter}
        </p>
        <div className='like-comment-wrap'>
          <img src={like} alt='like-image' onClick={()=>handleLike()}/>
          <span>{feedContent.like}</span>
          <img src={comment} alt='comment-image' onClick={handleComment} />
          <span>{feedContent.comment_count}</span>
        </div>
        <div className='feedDetail-content-image' style={{ backgroundImage: `${feedContent.image}` }}>

        </div>
        <p className={`${contentSize ? 'feedDetail-content-thebody active' : 'feedDetail-content-thebody'}`}>
          {feedContent.content}
        </p>
      </div>
  )
}

export default FeedContent