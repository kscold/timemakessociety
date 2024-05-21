import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../common/Footer';
import FeedContent from './FeedContent';
import TimeModal from '../Modal/TimeModal';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';

function parseSecondsToTime(secs) {
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = secs % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

function parseTimeToSeconds(timeString) {
  const timeParts = timeString.split(':').map(Number);
  if (timeParts.length === 2) {
    // MM:SS
    return timeParts[0] * 60 + timeParts[1];
  } else if (timeParts.length === 3) {
    // HH:MM:SS
    return timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
  } else {
    return 0;
  }
}

function Feed() {
  const [feedState, setFeedState] = useState('실시간');
  const [feedList, setFeedList] = useState([]);
  const [liveList, setLiveList] = useState([]);
  const [scrabList, setScrabList] = useState([]);
  const [bookmarkStates, setBookmarkStates] = useState({});
  const [page, setPage] = useState(0);
  const [ref, InView] = useInView();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const readArticles = useSelector(
    (state) => state.readArticle.readAriticleList
  );
  const memberId = localStorage.getItem('memberId');
  const memberNickname = localStorage.getItem('memberNickname');
  const category = localStorage.getItem('activeCategory');
  const timer = localStorage.getItem('timer');

  const [totalArticleTime, setTotalArticleTime] = useState(
    parseTimeToSeconds(timer)
  );

  const recommendFeedCache = useRef(
    JSON.parse(sessionStorage.getItem('recommendCache'))
  );

  const handleFeedState = (state) => {
    setFeedState(state);
  };

  const handleFeed = (id) => {
    navigate(`/feed_detail/${feedState}/${id}`);
  };

  const fetchLiveFeed = async () => {
    try {
      const response = await axios.get(`/api/articles?page=${page}`);
      const response2 = await axios.get(`/api/${memberId}/scrap`);
      setScrabList(response2.data);
      const newLiveList = [...liveList, ...response.data.articles];
      setLiveList(newLiveList);
      setPage((prev) => prev + 1);

      const newBookmarkStates = {};
      newLiveList.forEach((article) => {
        const id = article.id;
        newBookmarkStates[id] = {
          id: id,
          state: response2.data.some((scrab) => scrab.uuidArticleId === id),
        };
      });
      setBookmarkStates(newBookmarkStates);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecommendFeed = async () => {
    if (recommendFeedCache.current) {
      setFeedList(recommendFeedCache.current);
      return;
    }

    try {
      const response = await axios.get(
        `/api/articles/recommend?category=${category}&target=${timer}`
      );
      const response2 = await axios.get(`/api/${memberId}/scrap`);
      setFeedList(response.data);
      setScrabList(response2.data);
      recommendFeedCache.current = response.data;
      sessionStorage.setItem('recommendCache', JSON.stringify(response.data));

      const newBookmarkStates = {};
      response.data.forEach((article) => {
        const id = article.id;
        newBookmarkStates[id] = {
          id: id,
          state: response2.data.some((scrab) => scrab.uuidArticleId === id),
        };
      });
      setBookmarkStates(newBookmarkStates);

      const totalSeconds = response.data.reduce((acc, article) => {
        return acc + parseTimeToSeconds(article.articleTime);
      }, 0);

      setTotalArticleTime(totalSeconds);
      localStorage.setItem('totalArticleTime', totalSeconds);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchScrapFeed = async () => {
    try {
      const response = await axios.get(`/api/${memberId}/scrap`);
      setFeedList(response.data);
      setScrabList(response.data);

      const newBookmarkStates = {};
      response.data.forEach((article) => {
        const id = article.uuidArticleId;
        newBookmarkStates[id] = {
          id: id,
          state: true,
        };
      });
      setBookmarkStates(newBookmarkStates);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (feedState === '실시간') {
      fetchLiveFeed();
    } else if (feedState === '추천') {
      fetchRecommendFeed();
    } else if (feedState === '스크랩') {
      fetchScrapFeed();
    }
  }, [feedState, InView]);

  useEffect(() => {
    const storedTotalArticleTime = localStorage.getItem('totalArticleTime');
    if (storedTotalArticleTime) {
      setTotalArticleTime(storedTotalArticleTime);
    }
  }, []);

  const handleBookmark = (id) => {
    // 즐겨찾기 삭제하는 부분
    if (feedState === '스크랩') {
      const deleteBookmark = async () => {
        try {
          const response = await axios.post('/api/scrap/cancel', {
            memberId: memberId,
            articleId: id,
          });
          console.log('post 제거:', response.data);

          setFeedList((prev) =>
            prev.filter((item) => item.uuidArticleId !== id)
          );
          setLiveList((prev) =>
            prev.filter((item) => item.uuidArticleId !== id)
          );
        } catch (error) {
          new Error(error);
        }
      };
      deleteBookmark();
    } else {
      // 즐겨찾기되어있는 경우
      if (bookmarkStates[id]?.state) {
        const deleteBookmark = async () => {
          try {
            const response = await axios.post('/api/scrap/cancel', {
              memberId: memberId,
              articleId: id,
            });
            console.log('post 제거: ', response.data);
            setBookmarkStates((prev) => {
              const newBookmarkStates = { ...prev };
              newBookmarkStates[id] = {
                id: id,
                state: !prev[id]?.state || false,
              };
              return newBookmarkStates;
            });
          } catch (error) {
            console.log(error);
          }
        };
        deleteBookmark();
      }
      // 즐겨찾기되어있지 않은 경우
      else {
        setBookmarkStates((prev) => {
          const newBookmarkStates = { ...prev };
          newBookmarkStates[id] = {
            id: id,
            state: !prev[id]?.state || true,
          };
          return newBookmarkStates;
        });
        const postBookmark = async () => {
          try {
            const response = await axios.post(`/api/scrap`, {
              memberId: memberId,
              articleId: id,
            });
            console.log('post성공: ', response.data);
          } catch (error) {
            new Error(error);
          }
        };
        postBookmark();
      }
    }
  };

  const handleRefreshRecommend = async () => {
    try {
      setLoading(true);
      const modifiedTimer = localStorage.getItem('modifiedTimer');
      const timer = parseSecondsToTime(modifiedTimer);
      const response = await axios.get(
        `/api/articles/recommend?category=${category}&target=${timer}`
      );
      const response2 = await axios.get(`/api/${memberId}/scrap`);
      setFeedList(response.data);
      setScrabList(response2.data);
      recommendFeedCache.current = response.data;
      sessionStorage.setItem('recommendCache', JSON.stringify(response.data));

      const newBookmarkStates = {};
      response.data.forEach((article) => {
        const id = article.id;
        newBookmarkStates[id] = {
          id: id,
          state: response2.data.some((scrab) => scrab.uuidArticleId === id),
        };
      });
      setBookmarkStates(newBookmarkStates);

      const totalSeconds = response.data.reduce((acc, article) => {
        return acc + parseTimeToSeconds(article.articleTime);
      }, 0);

      setTotalArticleTime(totalSeconds);
      localStorage.setItem('totalArticleTime', totalSeconds);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fs = feedState === '실시간' ? liveList : feedList;

  return (
    <div className="feed-wrap">
      <div className="feed-header-wrap">
        <button
          className={
            feedState === '실시간' ? 'feed-header active' : 'feed-header'
          }
          onClick={() => handleFeedState('실시간')}
        >
          실시간
        </button>
        <button
          className={
            feedState === '추천' ? 'feed-header active' : 'feed-header'
          }
          onClick={() => handleFeedState('추천')}
        >
          추천
        </button>
        <button
          className={
            feedState === '스크랩' ? 'feed-header active' : 'feed-header'
          }
          onClick={() => handleFeedState('스크랩')}
        >
          스크랩
        </button>
      </div>

      <div className="feed-content-wrap">
        {feedState === '추천' && (
          <div className="recommend-info-warp">
            <div className="text-wrap">
              <p
                style={{
                  color: '#0064cd',
                  fontSize: '22px',
                  fontWeight: '700',
                }}
              >
                {memberNickname}
                <span
                  style={{
                    color: '#333333',
                    fontSize: '15px',
                    fontWeight: '700',
                  }}
                >
                  님
                </span>
              </p>
              <p className="recommend-info">기사를 추천해드려요!</p>
              <p className="refresh-all-time">
                추천된 총 기사 시간:<span> </span>
                <span style={{ color: '#333333' }}>
                  {parseSecondsToTime(totalArticleTime)}
                </span>
              </p>
            </div>

            <div className="refresh-recommend-info">
              <button
                className="refresh-button"
                onClick={handleRefreshRecommend}
                disabled={loading} // 로딩 중에는 버튼 비활성화
              >
                {loading ? <span className="loader" /> : '새로 추천'}
              </button>
            </div>
          </div>
        )}

        {Array.isArray(fs) &&
          fs?.map((feed, index) =>
            feedState === '실시간' || feedState === '추천' ? (
              <FeedContent
                key={index}
                readArticles={readArticles}
                scrabList={scrabList}
                feedState={feedState}
                bookmarkStates={bookmarkStates}
                setBookmarkStates={setBookmarkStates}
                feed={feed}
                handleBookmark={handleBookmark}
                onClick={() => handleFeed(feed.id)}
              />
            ) : (
              <FeedContent
                key={index}
                readArticles={readArticles}
                scrabList={scrabList}
                setFeedList={setFeedList}
                feed={feed}
                feedState={feedState}
                handleBookmark={handleBookmark}
                bookmarkStates={bookmarkStates}
                setBookmarkStates={setBookmarkStates}
                onClick={() => handleFeed(feed.uuidArticleId)}
              />
            )
          )}

        <div className="scrollEnd" ref={ref}></div>
      </div>

      <TimeModal />
      <Footer footerState={'feed'} />
    </div>
  );
}

export default Feed;
