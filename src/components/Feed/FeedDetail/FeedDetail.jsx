import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


import backward from '../../../assets/backward.svg';
import FeedFooter from './FeedFooter';
import FeedContent from './FeedContent';
import FeedHeader from './FeedHeader';
import TimeModal from '../../Modal/TimeModal';
import CommentModal from '../../Modal/CommentModal';

function FeedDetail({ feedType }) {
  //feedType은 리덕스로 관리 -> 실시간, 추천 , 스크랩을 feedtype을 이용해서 렌더링
  const [feedContent, setFeedContent] = useState({});
  const [feedState, setFeedState] = useState(false);
  const [contentSize, setContentSize] = useState(false);
  const [commentState, setCommentState] = useState(false);
  const [backWardState, setBackWardState] = useState(false);
  const [likeStates, setLikeStates] = useState();//api활용 상태관리
  const [readTime, setReadTime] = useState(0);
  const [formatReadTime, setFormatReadTime] = useState('');
  const [scrabState, setScrabState] = useState();
  const [loading,setLoading] = useState(true);//api 호출할 때 렌더링 과정중 로딩표현
  const { name,id } = useParams();
  const memberId = localStorage.getItem('memberId');
  const getTime = localStorage.getItem('readTime');
  const navigate = useNavigate();
  //console.log("feedDetail:", id);
  const handleGoBack = async () => {
    setBackWardState(true)
    try {

      const response = await axios.post('/api/members/readTime', {
        "memberId": memberId,
        "readTime": formatReadTime
      })
      const response2 = await axios.post('/api/members/categoryReadTime', {
        "member": {
          "id": memberId
        },
        "category": feedContent.category,
        "readTime": formatReadTime
      })
      await console.log('읽은시간 post상태:', response.data)
      await console.log('읽은시간누적 post상태:', response2.data)
    }
    catch (error) {
      new Error(error);
    }
    const accumulateTime = readTime+Number(getTime) ;
    localStorage.setItem('readTime',accumulateTime)
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
  if (commentState) {
    document.body.style.overflow = 'hidden';
  }
  else {
    document.body.style.overflow = 'auto';
  }
  const handleLike = async () => {
    if (likeStates?.liked) {
      //delete
      const response = await axios.delete(`/api/articles/like/${id}/${memberId}`, {
      })
      console.log(response.data)
    }
    else {
      const response = await axios.post(`/api/articles/like/${id}/${memberId}`, {

      })
      console.log(response.data)
    }
  }
  // 스크랩 post/delete
  const handleScrab=async()=>{
    if(scrabState){
      //삭제
      const response = await axios.post('/api/scrap/cancel',{
        "memberId": memberId,
        "articleId": id,
      })
      console.log(response.data)
      setScrabState(false);
    }
    else{
      //추가
      const response = await axios.post('/api/scrap',{
        "memberId": memberId,
        "articleId": id,
      })
      console.log(response.data)
      setScrabState(true);
    }
    
  }

  useEffect(() => {
    
    if (feedState) {
      // --임시 API 통신 code--
      const fetchFeedDetail = async () => {
        
        try {
          const response = await axios.get(`/api/summarize/${id}`);
          setLoading(false)
          setFeedContent(response.data);
          console.log("summary data: ",response.data)
        }
        catch (error) {
          new Error(error)
        }
      }
      fetchFeedDetail();

    }
    else {
      // --임시 API 통신 code--
      const fetchFeedDetail = async () => {
        try {
          const response = await axios.get(`/api/articles/${id}`);
          const response2 = await axios.get(`/api/articles/similarity/${id}`) ;
          console.log("response2 data", response2.data);
          setFeedContent(response.data)
          
        }
        catch (error) {
          new Error(error)
        }
      }
      const fetchScrap = async() =>{
        try{
          const response2 = await axios.get(`/api/${memberId}/scrap`);
          console.log("fetch Scrap",response2.data);
          response2.data.map((item,index) => {
            if(item.uuidArticleId===id){
              setScrabState(true);
              console.log(scrabState)
            }
            
          });
        }
        catch(error){
          console.log(error)
        }
      }
      fetchFeedDetail();
      fetchScrap();

    }

  }, [feedState])

  useEffect(()=>{
    const fetchLike =async()=>{
      const response = await axios.get(`/api/articles/like/${id}/${memberId}`)
      setLikeStates(response.data)
    }
    fetchLike();
  },[likeStates])

  useEffect(() => {
    const time = setInterval(() => {
      setReadTime((prevTime) => prevTime + 1)
    }, 1000);

    if (backWardState) {
      clearInterval(time)
    }
    return () => clearInterval(time)
  }, [backWardState])
  useEffect(() => {
    const minute = Math.floor(readTime / 60);
    const second = (readTime % 60);
    const format = `00:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
    setFormatReadTime(format);
  }, [readTime])

  // console.log("readTime:",formatReadTime)
  return (
    <>
      <FeedHeader name={name} handleGoBack={handleGoBack} commentState={commentState} />
      <FeedContent loading={loading} likeStates={likeStates} setLikeStates={setLikeStates} handleLike={handleLike} feedState={feedState} feedContent={feedContent} contentSize={contentSize} commentState={commentState} handleComment={() => handleComment(true)} />
      <TimeModal />
      {commentState ? <CommentModal id={id} setCommentState={setCommentState} articleId={id} handleComment={() => handleComment(false)} /> : ''}
      <FeedFooter scrabState={scrabState} handleScrab={handleScrab} handleContentSizeUpDown={handleContentSizeUpDown} handleFeedState={handleFeedState} feedState={feedState} />
    </>

  )
}

export default FeedDetail