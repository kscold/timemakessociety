import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import FeedFooter from './FeedFooter';
import FeedContent from './FeedContent';
import FeedHeader from './FeedHeader';
import TimeModal from '../../Modal/TimeModal';
import CommentModal from '../../Modal/CommentModal';
import FeedTimeModal from './FeedTimeModal';
import { readAriticlesActions } from '../../../store/readArticles';
import { isGoToSimilarAction } from '../../../store/isGoToSimilar';

function FeedDetail() {
  const [feedContent, setFeedContent] = useState({});
  const [summarize, setSummarize] = useState('');
  const [feedState, setFeedState] = useState(false);
  const [contentSize, setContentSize] = useState(false);
  const [commentState, setCommentState] = useState(false);
  const [backWardState, setBackWardState] = useState(false);
  const [likeStates, setLikeStates] = useState();
  const [readTime, setReadTime] = useState(0);
  const [formatReadTime, setFormatReadTime] = useState('');
  const [scrabState, setScrabState] = useState();
  const [loading, setLoading] = useState(true);
  const [summarizeLoading, setSummarizeLoading] = useState(false);
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [similarity, setSimilarity] = useState(0);

  const dispatch = useDispatch();
  const readArticleArray = useSelector(
    (state) => state.readArticle.readAriticleList
  );

  const isClickSimilarButton = useSelector(
    (state) => state.isGoToSimilar.isGoToSimilarState
  );

  const { name, id } = useParams();
  const memberId = localStorage.getItem('memberId');
  const getTime = localStorage.getItem('readTime');
  const navigate = useNavigate();

  const handleGoBack = async (identifier) => {
    setBackWardState(true);

    try {
      const response = await axios.post('/api/members/readTime', {
        memberId: memberId,
        readTime: formatReadTime,
      });
      const response2 = await axios.post('/api/members/categoryReadTime', {
        member: {
          id: memberId,
        },
        category: feedContent.category,
        readTime: formatReadTime,
      });

      await console.log('읽은시간 post상태:', response.data);
      await console.log('읽은시간누적 post상태:', response2.data);
    } catch (error) {
      new Error(error);
    }

    dispatch(readAriticlesActions.plus(id));
    const accumulateTime = readTime + Number(getTime);
    localStorage.setItem('readTime', accumulateTime);
    if (identifier === 'back') {
      if (isClickSimilarButton) {
        navigate(-3);
        dispatch(isGoToSimilarAction.toggle(false));
      } else {
        navigate(-1);
      }
    }
  };

  const handleFeedState = () => {
    setFeedState(!feedState);
  };

  const handleComment = (state) => {
    setCommentState(state);
  };

  const handleContentSizeUpDown = () => {
    setContentSize(!contentSize);
  };

  if (commentState) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  const handleLike = async () => {
    if (likeStates?.liked) {
      const response = await axios.delete(
        `/api/articles/like/${id}/${memberId}`,
        {}
      );
      console.log(response.data);
    } else {
      const response = await axios.post(
        `/api/articles/like/${id}/${memberId}`,
        {}
      );
      console.log(response.data);
    }
  };

  const handleScrab = async () => {
    if (scrabState) {
      const response = await axios.post('/api/scrap/cancel', {
        memberId: memberId,
        articleId: id,
      });
      console.log(response.data);
      setScrabState(false);
    } else {
      const response = await axios.post('/api/scrap', {
        memberId: memberId,
        articleId: id,
      });
      console.log(response.data);
      setScrabState(true);
    }
  };

  const onClickGptButton = async () => {
    setSummarizeLoading(true);
    try {
      const response = await axios.get(`/api/summarize/${id}`);
      setSummarize(response.data.gptContent);
      setSimilarity(response.data.similarity);
      setSummarizeLoading(false);
    } catch (error) {
      setSummarizeLoading(false);
      new Error(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const moving = window.pageYOffset;
      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [position]);

  useEffect(() => {
    console.log('read articles array: ', readArticleArray);
    console.log('isClickSimilar: ', isClickSimilarButton);

    const fetchFeedDetail = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        setFeedContent(response.data);
        setSummarize(response.data.gptContent);
        setSimilarity(response.data.similarity);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        new Error(error);
      }
    };

    const fetchScrap = async () => {
      try {
        const response2 = await axios.get(`/api/${memberId}/scrap`);
        console.log('fetch Scrap', response2.data);
        response2.data.map((item) => {
          if (item.uuidArticleId === id) {
            setScrabState(true);
            console.log(scrabState);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedDetail();
    fetchScrap();
  }, [feedState]);

  useEffect(() => {
    const fetchLike = async () => {
      const response = await axios.get(`/api/articles/like/${id}/${memberId}`);
      setLikeStates(response.data);
    };
    fetchLike();
  }, [likeStates]);

  useEffect(() => {
    const time = setInterval(() => {
      setReadTime((prevTime) => prevTime + 1);
    }, 1000);
    if (backWardState) {
      clearInterval(time);
    }
    return () => clearInterval(time);
  }, [backWardState]);

  useEffect(() => {
    const minute = Math.floor(readTime / 60);
    const second = readTime % 60;
    const format = `00:${minute < 10 ? `0${minute}` : minute}:${
      second < 10 ? `0${second}` : second
    }`;
    setFormatReadTime(format);
  }, [readTime]);

  return (
    <>
      {visible ? (
        <FeedHeader
          name={name}
          id={id}
          handleGoBack={handleGoBack}
          commentState={commentState}
        />
      ) : (
        ''
      )}
      <FeedTimeModal formatReadTime={formatReadTime} />
      <FeedContent
        loading={loading}
        likeStates={likeStates}
        setLikeStates={setLikeStates}
        handleLike={handleLike}
        feedState={feedState}
        feedContent={feedContent}
        contentSize={contentSize}
        commentState={commentState}
        similarity={similarity}
        setSimilarity={setSimilarity}
        summarize={summarize}
        summarizeLoading={summarizeLoading}
        id={id}
        handleComment={() => handleComment(true)}
        onClickGptButton={onClickGptButton}
      />
      <TimeModal />
      {commentState ? (
        <CommentModal
          id={id}
          setCommentState={setCommentState}
          articleId={id}
          handleComment={() => handleComment(false)}
        />
      ) : (
        ''
      )}
      <FeedFooter
        scrabState={scrabState}
        handleScrab={handleScrab}
        handleContentSizeUpDown={handleContentSizeUpDown}
        handleFeedState={handleFeedState}
        feedState={feedState}
        similarity={similarity}
        setSimilarity={setSimilarity}
        onClickGptButton={onClickGptButton}
      />
    </>
  );
}

export default FeedDetail;
