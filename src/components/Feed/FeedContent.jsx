import React, { useEffect, useState } from 'react'

import BookmarkEmpty from '../../assets/feed/bookmark-emptyy.svg';
import BookmarkFill from '../../assets/feed/bookmark-fill.svg';
import Option from '../../assets/feed/option.svg';
import axios from 'axios';
function FeedContent({feed,setFeedList,onClick,feedState,handleBookmark,bookmarkStates,setBookmarkStates}) {
    
    // useEffect(()=>{
    //     if(feedState==='스크랩'){
    //         setBookmarkStates(true);
    //     }
        
    // },[])
    
    return (
        <div className='feed-content' >
            <img src={feed.image} className='feed-image' alt='iamgeUrl' onClick={onClick}/>
            <div className='feed-desc-wrap'>
                <p className='feed-desc-title'>{feed.title}</p>
                <p className='feed-desc-publisher'>{feed.category}</p>
                <img src={(feedState==='스크랩' ? bookmarkStates[feed.uuidArticleId]?.state : bookmarkStates[feed.id]?.state)? BookmarkFill : BookmarkEmpty} className='scrab' alt='scrab-image' onClick={() =>handleBookmark(feedState==='스크랩' ? feed.uuidArticleId : feed.id)} />
               
                <img src={Option} className='option' alt='option-image' />
            </div>

        </div>
    )
}

export default FeedContent