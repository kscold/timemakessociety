import React from 'react';
import like from '../../../assets/feedDetail/like.svg';
import Filllike from '../../../assets/feedDetail/fill-likes.png';
import comment from '../../../assets/feedDetail/comment.svg';
import FeedLoading from './FeedLoading';
import { motion } from 'framer-motion';

function FeedContent({
  loading,
  likeStates,
  handleLike,
  feedContent,
  feedState,
  contentSize,
  commentState,
  handleComment,
  similarity,
  summarize,
  summarizeLoading,
  onClickGptButton,
}) {
  const feedContentLength = feedContent.content?.length;

  return (
    <div className="feedDetail-content-wrap">
      <p className="feedDetail-content-header">{feedContent.title}</p>
      <p className="feedDetail-content-date">
        입력
        <span style={{ marginLeft: '7px', marginRight: '7px' }}>
          {feedContent.createdDate} {feedContent.category}
        </span>
        <span className="feedDetail-content-articlestate">
          {feedState ? '기사요약' : '기사원문'}
        </span>
      </p>
      <p className="feedDetail-content-reporter">
        평균 읽는 시간: {feedContent.articleTime}
      </p>
      <p className="similarity">
        원문기사와 요약기사의 <span>유사도:</span> <b>{similarity}%</b>
      </p>

      <div className="like-comment-wrap">
        <motion.div
          whileTap={{ scale: 1.5 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          <img
            src={likeStates?.liked ? Filllike : like}
            alt="like-image"
            onClick={handleLike}
          />
        </motion.div>

        <span>{likeStates?.likeCount}</span>
        <div onClick={handleComment} className="comment">
          <img src={comment} alt="comment-image" />
          <span>댓글보기</span>
        </div>
      </div>
      <div
        className="feedDetail-content-image"
        style={{ backgroundImage: `url(${feedContent.image})` }}
      ></div>
      <p
        className={`${
          contentSize
            ? 'feedDetail-content-thebody active'
            : 'feedDetail-content-thebody'
        }`}
      >
        {feedState && summarizeLoading ? (
          <FeedLoading isSimilar={false} />
        ) : feedState && feedContentLength <= 100 ? (
          '내용이 짧기 때문에 요약할 내용이 없습니다.'
        ) : feedState && summarize ? (
          summarize
        ) : (
          feedContent.content
        )}
      </p>
    </div>
  );
}

export default FeedContent;
