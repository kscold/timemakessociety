import React from 'react'
import { motion } from 'framer-motion';

import BookmarkEmpty from '../../assets/feed/bookmark-emptyy.svg';
import BookmarkFill from '../../assets/feed/bookmark-fill.svg';
import Option from '../../assets/feed/option.svg';
function CategoryContent({ feed, onClick, feedState, handleBookmark, bookmarkStates, setBookmarkStates }) {
    return (
        <div className='feed-content' >
            <img src={feed.image} className='feed-image' alt='iamgeUrl' onClick={onClick} />
            <div className='feed-desc-wrap'>
                <p className='feed-desc-title'>{feed.title}</p>
                <p className='feed-desc-publisher'>{feed.category}</p>
                <motion.img
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                    src={bookmarkStates[feed.id]?.state ? BookmarkFill : BookmarkEmpty}
                    className='scrab' alt='scrab-image' onClick={() => handleBookmark(feed.id)} />

                <img src={Option} className='option' alt='option-image' />
            </div>

        </div>
    )
}

export default CategoryContent