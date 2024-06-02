import React from 'react';
import { motion } from 'framer-motion';

import share from '../../../assets/feedFooter/share.svg';
import scrab from '../../../assets/feedFooter/scrab.svg';
import scrabFill from '../../../assets/feed/bookmark-fill.svg';
import restart from '../../../assets/feedFooter/restart.png';
function FeedFooter({
  scrabState,
  handleScrab,
  handleFeedState,
  handleContentSizeUpDown,
  feedState,
  similarity,
  setSimilarity,
  onClickGptButton,
}) {
  return (
    <div className="feedDetail-footer-wrap">
      <div className="letter-wrap" onClick={handleContentSizeUpDown}>
        <span className="small-letter">가</span>
        <span className="big-letter">가</span>
      </div>
      <div className="feedDetail-footer-button-wrap">
        <button
          className={`${feedState ? '' : 'active'}`}
          onClick={handleFeedState}
        >
          원문view
        </button>
        <button
          className={`${feedState ? 'active' : ''}`}
          onClick={handleFeedState}
        >
          요약view
        </button>
      </div>
      <div className="feedDetail-footer-image-wrap">
        <motion.div
          whileTap={{ scale: 1.5 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          <img
            src={restart}
            className="feedDetail-footer-image"
            alt="share-image"
            onClick={onClickGptButton}
          />
        </motion.div>

        <motion.div
          whileTap={{ scale: 1.5 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          <img
            src={scrabState ? scrabFill : scrab}
            className="feedDetail-footer-image"
            alt="scrab-image"
            onClick={handleScrab}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default FeedFooter;
