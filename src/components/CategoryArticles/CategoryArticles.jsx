import React, { useEffect, useState } from 'react'

import 경제 from '../../assets/categoryArticles/economy.jpg';
import 문화 from '../../assets/categoryArticles/culture.jpg';
import 정치 from '../../assets/categoryArticles/politics.jpg';
import 과학 from '../../assets/categoryArticles/science.jpg';
import 사회 from '../../assets/categoryArticles/society.jpg';
import 스포츠 from '../../assets/categoryArticles/sport.jpg';
import 기술 from '../../assets/categoryArticles/tech.jpg';
import 해외 from '../../assets/categoryArticles/world.png';
import 연예 from '../../assets/categoryArticles/entertainment.jpg';
import x_symbol from '../../assets/categoryArticles/x-symbol.png';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../common/Footer'
import FeedContent from '../../components/Feed/FeedContent';
import TimeModal from '../Modal/TimeModal';
import { useInView } from 'react-intersection-observer';
import CategoryList from '../Main/CategoryList';
import { dummydata } from '../Feed/data';
import { useSelector } from 'react-redux';
function CategoryArticles() {
  const { name } = useParams();
  const categoryImage = {
    경제,
    문화,
    연예,
    정치,
    과학,
    사회,
    스포츠,
    기술,
    해외,
  }
  const backGroundImage = categoryImage[name];
  const [feedState, setFeedState] = useState('실시간'); //피드의 카테고리
  const [feedList, setFeedList] = useState([]);// 피드 데이터 받아옴
  const [categoryChange,setCategoryChange] = useState();
  const [liveList, setLiveList] = useState([]); // 실시간데이터
  const [scrabList, setScrabList] = useState([]);// 스크랩 데이터 받아옴
  const [bookmarkStates, setBookmarkStates] = useState([]); // 즐겨찾기 상태 true인지 false인지
  const [page, setPage] = useState(0); //페이지를 할당하기 위한 상태
  const readArticles = useSelector(state => state.readArticle.readAriticleList)
  const [ref, InView] = useInView();
  const categoryPage= true;
  const memberId = localStorage.getItem('memberId')
  const timer = localStorage.getItem('timer');
  const category = localStorage.getItem('category');

  const navigate = useNavigate();
  const handleaCategory = (state) => {
    setCategoryChange(true);
  }
  const handleFeed = (id) => {
    navigate(`/feed_detail/${feedState}/${id}`);
  }
  useEffect(() => {
    // - api통신 -
    const fetchLiveFeed = async () => {
      try {

        const response = await axios.get(`/api/articles?category=${name}&page=${page}`);
        const response2 = await axios.get(`/api/${memberId}/scrap`);
        setScrabList(response2.data);
        setLiveList([...liveList, ...(response.data.articles)]);
      
        //setFeedList([...feedList,...(response.data.articles)]);
        setPage((prev) => prev + 1);
        console.log('pageNumber: ', page)
        console.log("fetchLive: ", response.data.articles);
        console.log('fetchScrab: ', scrabList)
        const newBookmarkStates = {};
        liveList.forEach((article) => {
          const id = article.id;
          const category = article.category;
          newBookmarkStates[id] = {
            id: id,
            category: category,
            state: response2.data.some((scrab) => scrab.uuidArticleId === id),
          }
        })
        setBookmarkStates(newBookmarkStates);
        console.log("실시간bookmarkStates: ", bookmarkStates)

      }
      catch (error) {
        new Error(error)
      }
    }

    fetchLiveFeed();
    
  }, [feedState, InView,categoryChange,setCategoryChange])
  console.log('catgoryState',categoryChange)
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

  const fs = liveList

  return (
    <>
      <div className='categoryArticles-header-wrap' >
        <span className='categoryArticles-background-wrap' style={{ backgroundImage: `url(${backGroundImage})` }} />
        <div className='categoryArticles-header-text'>
          <Link to={'/home'}><img src={x_symbol} alt='exit' /></Link>
          <p>{name}</p>
        </div>
      </div>
      

      <div className='feed-wrap'>
        <div className='feed-content-wrap'>
          {Array.isArray(fs) && fs?.map((feed, index) => (
            <FeedContent key={index} readArticles={readArticles} scrabList={scrabList} feedState={feedState} bookmarkStates={bookmarkStates} setBookmarkStates={setBookmarkStates} feed={feed} handleBookmark={handleBookmark} onClick={() => handleFeed(feed.id)} />
          ))}
          <div className='scrollEnd' ref={ref}></div>
        </div>


        <TimeModal />
        <Footer footerState={'feed'} />
      </div>

    </>
  )
}

export default CategoryArticles