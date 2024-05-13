import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


import backward from '../../../assets/backward.svg';
import FeedFooter from './FeedFooter';
import FeedContent from './FeedContent';
import FeedHeader from './FeedHeader';
import TimeModal from '../../Modal/TimeModal';
import CommentModal from '../../Modal/CommentModal';

const dummyOriginalData = {
  "title": "GS건설, '<b>문화</b>자이SKVIEW' 견본주택 19일 오픈",
  "content": "문화자이SKVIEW 조감도 (GS건설 제공)\n\n(대전=국제뉴스) 이규성 기자 = 대전 중구에서 20년 만에 선보이는 1,500가구 이상 대단지 ‘문화자이SKVIEW’ 견본주택이 19일 오픈한다.\n\nGS건설은 대전시 중구 문화동 문화8구역 주택재개발정비사업지에 SK에코플랜트와 컨소시엄을 구성해 조성하는 ‘문화자이SKVIEW’의 견본주택을 19일 금요일 오픈하고 본격 분양 일정에 돌입한다고 18일 밝혔다.\n\n문화자이SKVIEW는 지하 3층 ~ 지상 최고 34층, 아파트 19개 동, 전용면적 39㎡ ~ 123㎡, 총 1,746가구 규모로 들어선다. 이 가운데 1,207가구를 일반분양하며, 전용면적별로 살펴보면 △52㎡ 83가구△59㎡ 317가구 △75㎡ 305가구 △84㎡ 502가구로 구성된다.\n\n청약 일정은 29일 특별공급접수를 시작으로 30일 1순위 청약접수, 근로자의 날 다음날인 5월 2일 목요일에 2순위 청약접수를 진행한다. 당첨자 발표는 5월 9일, 정당계약은 같은 달 20일부터 22일까지 3일간 진행할 예정이다.\n\n1순위 자격요건은 대전시와 세종시, 충남 등에 거주하는 만 19세 이상 세대주 · 세대원 가운데 청약통장 가입 기간이 6개월 이상, 지역별 예치금액 충족시 모든 주택형 청약 자격이 주어진다. 유주택자도 1순위 청약신청이 가능하고 2년 이내 가점제 당첨 세대에 속한 수요자도 1순위 추첨제로 청약 가능하다.\n\n문화자이SKVIEW는 우수한 교육환경과 함께 풍부한 교통·주거 인프라를 두루 갖췄다.\n\n단지로부터 도보 약 5분 거리에 동문초등학교가 있고, 글꽃중학교와 동산고등학교도 걸어서 통학이 가능하다. 단지 바로 인근에 보문산이 있고 보문산 대공원, 사정공원, 대전오월드, 대전보훈공원 등 다양한 공원이 가까운 거리에 위치해 있다. 뿐만 아니라, 대전 최대 규모 공공도서관인 한밭도서관도 단지 바로 앞에 위치하여 우수한 교육환경을 갖췄다.\n\n교통 환경도 양호하다. 문화자이SKVIEW는 단지 인근 유등로와 국도4호선을 이용 시내는 물론 전국으로의 이동이 편리하고, KTX서대전역도 차량 약 5분 거리에 있다. 특히, 지난해 하반기 착공해 오는 2026년 개통 목표인 충청권 광역철도 1단계 노선 문화역(가칭)도 단지 인근을 거치게 돼 대중교통망은 더 강화될 것으로 기대된다.\n\n풍부한 생활 인프라도 특징이다. 차량으로 약 6분 거리에 코스트코와 홈플러스, 하나로마트 등 근린생활시설이 있어 쇼핑이 편리하고 충청권 최대 규모 3차 상급종합병원 충남대병원도 가까운 거리에 위치해 있다.\n\n외관, 조경, 커뮤니티 등 특화설계를 통한 뛰어난 상품성도 문화자이SKVIEW의 강점이다.\n\n먼저 커튼월룩과 측면 특화 등 외관 특화설계를 적용해 단지 품격을 높였고, 다양한 컨셉의 조경 특화설계가 적용된다. 특히, 수경시설을 갖춘 중앙광장과 함께 플라워가든, 워터펀파크. 커뮤니티가든 등 입주민이 단지 내에서도 힐링할 수 있는 다양한 컨셉의 조경 공간이 마련될 예정이다.\n\n특히, 대단지의 장점을 살린 대규모 커뮤니티 시설이 눈길을 끈다. GDR 골프연습장, 사우나, 피트니스클럽, GX 등 기본적인 커뮤니티 시설과 함께 YBM영어도서관, 다목적체육관, 카페테리아, 게스트하우스 등 다양한 시설이 들어설 예정이다.",
  "category": "문화",
  "image": "https://cdn.gukjenews.com/news/thumbnail/202404/2972691_3047064_4213_v150.jpg",
  "link": "https://www.gukjenews.com/news/articleView.html?idxno=2972691",
  "articleTime": "00:02:35",
  "createdDate": "2024-04-18T17:46:00",
  "like": 5,
  "comment_count": 2,
}

const dummySummaryData =
{
  id: 1,
  title: '달려드는 독보적의 지극히 바딕이듯 세습에 폭락하냐 개혁하네.',
  date: '2024/04/21',
  ImageUrl: 'https://imgnews.pstatic.net/image/015/2024/04/16/0004973630_001_20240416184701028.jpg?type=w647',
  content: '달려드는 독보적의 지극히 바딕이듯 세습에 폭락하냐 개혁하네.달려드는 독보적의 지극히 바딕이듯 세습에 폭락하냐 개혁하네.달려드는 독보적의 지극히 바딕이듯 세습에 폭락하냐 개혁하네. ',
  reporter: '김승찬 기자',
  like: 5,
  comment_count: 2,
}


function FeedDetail({ feedType }) {
  //feedType은 리덕스로 관리 -> 실시간, 추천 , 스크랩을 feedtype을 이용해서 렌더링
  const [feedContent, setFeedContent] = useState({});
  const [feedState, setFeedState] = useState(false);
  const [contentSize, setContentSize] = useState(false);
  const [commentState,setCommentState] = useState(false);
  const [backWardState,setBackWardState] = useState(false);
  const [readTime,setReadTime] = useState(0);
  const [formatReadTime,setFormatReadTime] = useState('');
  const { id } = useParams();
  const memberId = localStorage.getItem('memberId');
  const navigate = useNavigate();
  //console.log("feedDetail:", id);
  const handleGoBack=async()=>{
    setBackWardState(true)
    try{
      
      const response = await axios.post('/api/members/readTime',{
        "memberId": memberId,
        "readTime": formatReadTime
      })
      const response2 = await axios.post('/api/members/categoryReadTime',{
        "member": {
            "id": memberId
        },
        "category": feedContent.category,
        "readTime": formatReadTime
    })
    await console.log('읽은시간 post상태:',response.data)
    await console.log('읽은시간누적 post상태:',response2.data)
    }
    catch(error){
      new Error(error);
    }
    navigate(-1);
  }
  //console.log("feed",feedContent.category)
  const handleFeedState = () => {
    setFeedState(!feedState);
  }
  const handleComment = (state) => {
    setCommentState(state);
  }
  const handleContentSizeUpDown = () => {
    setContentSize(!contentSize);
  }
  //바탕화면 스크롤 억제 기능
  if(commentState){
    document.body.style.overflow = 'hidden';
  }
  else{
    document.body.style.overflow = 'auto';
  }
  const handleLike = async() => {
    const response = await axios.post(`/api/articles/like/${id}`,{

    })
    console.log(response.data)
  }
  useEffect(() => {
    if(feedState){
      // --임시 API 통신 code--
       const fetchFeedDetail = async() => {
      try{
        const response = await axios.get(`/api/summarize/${id}`);
        console.log(response.data)
        setFeedContent(response.data)
      }
      catch(error){
        new Error(error)
      }
    }
    fetchFeedDetail();
      //setFeedContent(dummySummaryData)
    }
    else{
      // --임시 API 통신 code--
       const fetchFeedDetail = async() => {
      try{
        const response = await axios.get(`/api/articles/${id}`);
        setFeedContent(response.data)
      }
      catch(error){
        new Error(error)
      }
    }
    fetchFeedDetail();
      
    }
    
  }, [feedState])
  useEffect(()=>{
    const time = setInterval(() => {
      setReadTime((prevTime)=>prevTime+1)
    }, 1000);
    
    if(backWardState){
      clearInterval(time)
    }
    return ()=> clearInterval(time)
  },[backWardState])
  useEffect(()=>{
    const minute = Math.floor(readTime/60);
    const second = (readTime%60);
    const format = `00:${minute<10 ?`0${minute}` : minute}:${second <10 ? `0${second}` : second}`;
    setFormatReadTime(format);
  },[readTime])
  
 // console.log("readTime:",formatReadTime)
  return (
    <>
      <FeedHeader handleGoBack={handleGoBack} commentState={commentState}/>
      <FeedContent handleLike={handleLike} feedState={feedState} feedContent={feedContent} contentSize={contentSize} commentState={commentState} handleComment={() =>handleComment(true)} />
      <TimeModal/>
      {commentState? <CommentModal id={id} setCommentState={setCommentState} articleId={id} handleComment={() =>handleComment(false)}/> : ''}
      <FeedFooter handleContentSizeUpDown={handleContentSizeUpDown} handleFeedState={handleFeedState} feedState={feedState}/>
    </>

  )
}

export default FeedDetail