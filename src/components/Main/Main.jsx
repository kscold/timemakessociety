import React, { useEffect, useState } from 'react';
import { Link, json } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

import Tms from '../../assets/main/T_M_S.svg';
import Footer from '../common/Footer';
import TimeModal from '../Modal/TimeModal';
import { timerActions } from '../../store/count';
const dummydata2 ={
  "pageInfo": {
      "pageNumber": 0, // 현재 페이지
      "pageMaxSize": 5, // 최대 호출 기사 갯수
      "pageCurrentSize": 5, // 현재 호출된 기사
      "totalPageNumber": 2, // 모든 페이지 갯수 2개 이므로 page=0부터 page=1까지
      "totalSize": 17 // 모든 기사 갯수
  },
  "articles": [
      {
          "id": "0031b0a2-6c39-4355-bb5e-e3b751a0015a",
          "title": "'알콩달콩' 강예슬, 전원주와 찰떡 케미..관절 건강 직접 확인",
          "category": "연예",
          "image": "https://thumb.mtstarnews.com/21/2024/05/2024050922212680601_1.jpg",
          "publisher": "starnewskorea",
          "articleTime": "00:01:32",
          "createdDate": "2024-05-09T22:28:00"
      },
      {
          "id": "18e2bb0f-e579-4300-8859-5268a3528018",
          "title": "[연예가브리핑] 원빈↑…승리·기안84↓",
          "category": "연예",
          "image": "https://menu.moneys.co.kr/moneyweek/thumb/2024/05/09/06/2024050914524524554_1.jpg",
          "publisher": "moneys",
          "articleTime": "00:02:50",
          "createdDate": "2024-05-09T19:02:00"
      },
      {
          "id": "365e5b7d-aeda-4e9c-abcf-7c8e7ac352fa",
          "title": "[합천군 소식] 상수도 안전대책 추진-여성민방위대 양산리 수해복구 봉사",
          "category": "문화",
          "image": "https://www.kpinews.kr/data/upi/image/2024/05/09/p1065595903195352_376_thum.JPG",
          "publisher": "kpinews",
          "articleTime": "00:01:49",
          "createdDate": "2024-05-10T00:20:00"
      },
      {
          "id": "3bb0d5dd-c5d3-4d48-92da-ac23e7e50194",
          "title": "KBS 뉴스",
          "category": "문화",
          "image": "http://news.kbs.co.kr/data/news/title_image/newsmp4/gangneung/news9/2024/05/09/20_7960206.jpg",
          "publisher": "news",
          "articleTime": "00:02:01",
          "createdDate": "2024-05-09T23:46:00"
      },
      {
          "id": "3c54b7e0-9ba6-4e18-9520-31dcc873dc71",
          "title": "[잇슈 연예 브리핑] \"난 이제 품절녀\"…한예슬, 10살 연하 남친과 혼인신고",
          "category": "연예",
          "image": "https://cdn.obsnews.co.kr/news/thumbnail/202405/1440840_641515_315_v150.jpg",
          "publisher": "obsnews",
          "articleTime": "00:01:56",
          "createdDate": "2024-05-09T10:06:00"
      }
  ]
}

function Main() {
  const [liveArticle, setLiveArticle] = useState([]);
  const [recommendArticle, setRecommendArticle] = useState([]);
  const dispatch = useDispatch();
  const timer = localStorage.getItem('timer');
  
  //http://localhost:8080/api/articles/recommend?category=문화,스포츠&target=05:00
  //const strignTime = JSON.stringify(timer)
  const category = localStorage.getItem('category');
  console.log('timer',timer)
  console.log('category',category)
  useEffect(() => {
    // - api통신코드 -
    const fetchLiveArticle = async() =>{
      try{
        const response = await axios.get('/api/articles');
        const response2 = await axios.get(`/api/articles/recommend?category=${category}&target=${timer}`)
        console.log("response2.data",response2.data)
        setLiveArticle(response.data.articles);
        setRecommendArticle(response2.data)
        console.log("fetchLivedata: ",response.data.articles)
      }
      catch(error){
        console.log(error);
      }
    }
    fetchLiveArticle();
    dispatch(timerActions.timer(timer))

  }, [])
  

  return (
    <div className='main-wrap'>
      <Link to='/home'><img src={Tms} alt='tms-image' className='tms-logo' /></Link>

      <h3 className='title'>실시간 뉴스 기사</h3>
      <div className='live-wrap'>
        {console.log("livearticle 길이",liveArticle.length)}
        {liveArticle.map((article, index) => (
          <Link to={`/feed_detail/${article.id}`} key={article.id}>
            <div className='live-content-wrap' >
              <img src={article.image} alt="News Image" className='live-content-image' />
              <div className='live-content-title-wrap'>
                <h1 >{article.title}</h1>
                <p >{article.category}</p>
              </div>
            </div>
          </Link>


        ))}
      </div>
      <h3 className='title'>추천기사</h3>
      <div className='recommend-wrap'>
        {recommendArticle.map((article, index) => (
          <Link key={article.id} to={`/feed_detail/${article.id}`}>
            <div key={article.id} className='recommend-content-wrap'>
              <img src={article.image} alt="News Image" className='recommend-content-image' />
              <div className='recommend-content-title-wrap'>
                <h1 >{article.title}</h1>
                <p >{article.newsCategory}</p>
              </div>
            </div>
          </Link>


        ))}
      </div>
      <TimeModal/>
      <Footer footerState={'home'} />
    </div>
  )
}

export default Main