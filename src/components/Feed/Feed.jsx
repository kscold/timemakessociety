import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../common/Footer'
import FeedContent from './FeedContent';
import TimeModal from '../Modal/TimeModal';
import {useInView} from 'react-intersection-observer';
function Feed() {
  const [feedState, setFeedState] = useState('실시간'); //피드의 카테고리
  const [feedList, setFeedList] = useState([]);// 피드 데이터 받아옴
  const [liveList,setLiveList] = useState([]); // 실시간데이터
  const [scrabList, setScrabList] = useState([]);// 스크랩 데이터 받아옴
  const [bookmarkStates, setBookmarkStates] = useState([]); // 즐겨찾기 상태 true인지 false인지
  const [page,setPage] = useState(0); //페이지를 할당하기 위한 상태
  const [ref, InView] = useInView();
  const memberId = localStorage.getItem('memberId')
  const timer = localStorage.getItem('timer');
  const category = localStorage.getItem('category');

  const navigate = useNavigate();
  const handleFeedState = (state) => {
    setFeedState(state);
  }
  const handleFeed = (id) => {
    navigate(`/feed_detail/${feedState}/${id}`);
  }
  useEffect(() => {
    // - api통신 -
    const fetchLiveFeed = async (name) => {
      try {
        if (name === '실시간') {
          const response = await axios.get(`/api/articles?page=${page}`);
          const response2 = await axios.get(`/api/${memberId}/scrap`);
          setScrabList(response2.data);
          setLiveList([...liveList,...(response.data.articles)]);
          //setFeedList([...feedList,...(response.data.articles)]);
          setPage((prev)=>prev+1);
          console.log('pageNumber: ',page)
          console.log("fetchLive: ", response.data.articles);
          console.log('fetchScrab: ', scrabList)
          const newBookmarkStates = {};
          liveList.forEach((article) => {
            const id = article.id;
            const category = article.category;
            newBookmarkStates[id] = {
              id: id,
              category: category,
              state: response2.data.some((scrab) => scrab.uuidArticleId === id) ,
            }
          })
          setBookmarkStates(newBookmarkStates);
          console.log("실시간bookmarkStates: ", bookmarkStates)
        }
        else if (name === '추천') {
          const response = await axios.get(`/api/articles/recommend?category=${category}&target=${timer}`);
          const response2 = await axios.get(`/api/${memberId}/scrap`);
          setFeedList(response.data);
          setScrabList(response2.data);
          const newBookmarkStates = {};
          response.data.forEach((article) => {
            const id = article.id;
            const category = article.category;
            newBookmarkStates[article.id] = {
              id: id,
              category: category,
              state: scrabList?.some((scrab) => scrab.uuidArticleId === article.id),
            }
          })
          setBookmarkStates(newBookmarkStates);
          console.log("fetchRecommend: ", response.data);
          console.log("scrap: ", response2.data);
          console.log("추천bookmarkStates: ", bookmarkStates)
        }
        else if(name==='스크랩') {
          const response2 = await axios.get(`/api/${memberId}/scrap`);
          setFeedList(response2.data)
          setScrabList(response2.data)
          console.log("scrap: ",response2.data)
          console.log("스크랩bookmarkStates: ", bookmarkStates)
        }
      }
      catch (error) {
        new Error(error)
      }
    }
    if (feedState === '실시간') {
      fetchLiveFeed('실시간');

    }
    else if (feedState === '추천') {
      fetchLiveFeed('추천');
      
    }
    else {
      fetchLiveFeed('스크랩');
      const newBookmarkStates = {};
      scrabList.forEach((article) => {
        const id = article.uuidArticleId;
        const category = article.category;
        newBookmarkStates[id] = {
          id: id,
          category: category,
          state: true,
        }
      })
      setBookmarkStates(newBookmarkStates)
    }

  }, [feedState,InView])
  const handleBookmark = (id) => {
    //즐겨찾기 삭제하는 부분
    if (feedState === '스크랩') {
      const deleteBookmark = async () => {
        try {
          const response = await axios.post('/api/scrap/cancel', {
            "memberId": memberId,
            "articleId": id,
          })
          console.log("post 제거:", response.data)
          //setFeedList((prev) => (prev.filter((item) => item.uuidArticleId !== id)));
          setLiveList((prev) => (prev.filter((item) => item.uuidArticleId !== id)));
        }
        catch (error) {
          new Error(error);
        }
      }
      deleteBookmark()
    }
    else {
      //즐겨찾기되어있는 경우
      if (bookmarkStates[id]?.state) {
        const deleteBookmark = async () => {
          try {
            const response = await axios.post('/api/scrap/cancel', {
              "memberId": memberId,
              "articleId": id,
            })
            console.log("post 제거: ", response.data)
            setBookmarkStates((prev) => {
              const newBookmarkStates = { ...prev };
              newBookmarkStates[id] = {
                id: id,
                state: !prev[id]?.state || false,
              }
              return newBookmarkStates;
            })
          }
          catch (error) {
            console.log(error)
          }
        }
        deleteBookmark()
      }
      //즐겨찾기되어있지 않은 경우
      else {

        setBookmarkStates((prev) => {
          const newBookmarkStates = { ...prev };
          newBookmarkStates[id] = {
            id: id,
            state: !prev[id]?.state || true,
          }
          return newBookmarkStates;
        })
        const postBookmark = async () => {
          try {
            const response = await axios.post(`/api/scrap`, {
              "memberId": memberId,
              "articleId": id,
            });
            console.log("post성공: ", response.data)
          }
          catch (error) {
            new Error(error);
          }
        }
        postBookmark();
      }
    }
  }

  const fs = feedState==='실시간' ? liveList:feedList
  return (
    <div className='feed-wrap'>
      <div className='feed-header-wrap'>
        <button className={feedState === '실시간' ? 'feed-header active' : 'feed-header'} onClick={() => handleFeedState('실시간')}>실시간</button>
        <button className={feedState === '추천' ? 'feed-header active' : 'feed-header'} onClick={() => handleFeedState('추천')}>추천</button>
        <button className={feedState === '스크랩' ? 'feed-header active' : 'feed-header'} onClick={() => handleFeedState('스크랩')}>스크랩</button>
      </div>
      <div className='feed-content-wrap'>
        {Array.isArray(fs) && fs?.map((feed, index) => (
          feedState === '실시간' || feedState === '추천' ?
            <FeedContent key={index} scrabList={scrabList} feedState={feedState} bookmarkStates={bookmarkStates} setBookmarkStates={setBookmarkStates} feed={feed} handleBookmark={handleBookmark} onClick={() => handleFeed(feed.id)} />
            :
            <FeedContent key={index} scrabList={scrabList} setFeedList={setFeedList} feed={feed} feedState={feedState} handleBookmark={handleBookmark} bookmarkStates={bookmarkStates} setBookmarkStates={setBookmarkStates} onClick={() => handleFeed(feed.uuidArticleId)} />
        ))}
        <div className='scrollEnd' ref={ref}></div>
      </div>
      

      <TimeModal />
      <Footer footerState={'feed'} />
    </div>
  )
}

export default Feed