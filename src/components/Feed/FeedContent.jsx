import React, { useEffect, useState } from 'react';

import BookmarkEmpty from '../../assets/feed/bookmark-emptyy.svg';
import BookmarkFill from '../../assets/feed/bookmark-fill.svg';
import Option from '../../assets/feed/option.svg';
import { motion } from 'framer-motion';
import axios from 'axios';
function FeedContent({
  readArticles,
  feed,
  onClick,
  feedState,
  handleBookmark,
  bookmarkStates,
  setBookmarkStates,
}) {
  return (
    <div className="feed-content">
      <div
        className="feed-image"
        alt="iamgeUrl"
        onClick={onClick}
        style={{ backgroundImage: `url(${feed.image})` }}
      />

      <span className="text-on-backgorund">{feed.articleTime}</span>
      {readArticles?.includes(feed.id || feed.uuidArticleId) ? (
        <p className="text-on-backgorund active">읽은기사</p>
      ) : (
        ''
      )}
      <div className="feed-desc-wrap">
        <p className="feed-desc-title">{feed.title}</p>
        <div className="feed-desc-footer">
          <p className="feed-desc-publisher">{feed.publisher}</p>
          <p className="feed-desc-category">{feed.category}</p>
        </div>

        <motion.img
          whileTap={{ scale: 1.5 }}
          transition={{ type: 'spring', stiffness: 500 }}
          src={
            (
              feedState === '스크랩'
                ? bookmarkStates[feed.uuidArticleId]?.state
                : bookmarkStates[feed.id]?.state
            )
              ? BookmarkFill
              : BookmarkEmpty
          }
          className="scrab"
          alt="scrab-image"
          onClick={() =>
            handleBookmark(
              feedState === '스크랩' ? feed.uuidArticleId : feed.id
            )
          }
        />

        <img src={Option} className="option" alt="option-image" />
      </div>
    </div>
  );
}

export default FeedContent;
