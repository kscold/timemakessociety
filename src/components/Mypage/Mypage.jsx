import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

import Footer from '../common/Footer';
import Profile from './Profile';
import { loginActions } from '../../store/Login';
import option from '../../assets/mypage/option.svg';
import backward from '../../assets/backward.svg';
import infoCircle from '../../assets/mypage/info-circle-line.svg';
import Bar from './Bar';
import Top from './Top';
import TimeModal from '../Modal/TimeModal';
const dummydata = [
  {
    date:"mon",
    summary:"3:00",
    original:'6분',
  },
  {
    date:"tue",
    summary:"6:00",
    original:'6분',
  },
  {
    date:"wed",
    summary:"8:00",
    original:'6분',
  },
  {
    date:"thu",
    summary:"4:00",
    original:'6분',
  },
  {
    date:"fri",
    summary:"15:00",
    original:'6분',
  },
  {
    date:"sat",
    summary:"6:00",
    original:'6분',
  },
  {
    date:"sun",
    summary:"4:00",
    original:'6분',
  },
];
// const top4data=[
//   {id:1, category:'It', percentage:35},
//   {id:2, category:'sports', percentage:40},
//   {id:3, category:'technology', percentage:20},
//   {id:4, category:'science', percentage:5},
// ]
const top4data={
  "topCategories": [
      {
          "percentage": 31,
          "category": "world"
      },
      {
          "percentage": 23,
          "category": "entertain"
      },
      {
          "percentage": 23,
          "category": "politics"
      },
      {
          "percentage": 23,
          "category": "culture"
      }
  ],
  "memberId": 1
}
const userInfoDummyData = [
  {
      "loginId": "test",
      "password": "test!",
      "memberName": "testUser",
      "memberNickname": "testNickname",
      "totalReadTime": "00:08:00"
  }
]
function Mypage() {
  const [userInfo, setUserInfo] = useState(null);
  const loginId = localStorage.getItem('loginId');
  const password = localStorage.getItem('password');
  const memberId = localStorage.getItem('memberId');
  const memberName = localStorage.getItem('memberName');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log('redux login state:',loginId);
  console.log('redux password state', password);
  const handleLogout=async()=>{
    // - api 통신 코드 -
    try{
      const response = await axios.post('/api/logout',{
        "loginId": loginId,
        "password": password
      })
      console.log("logout",response.data)
    }
    catch(error){
      new Error(error)
    }
    localStorage.clear();
    dispatch(loginActions.logout());
    
    navigate('/login');
  }
  
  

  useEffect(() => {
    // -- userInfo api 통신 코드 -- 
    const fetchUserInfo = async() => {
      try{
        const response = await axios.get(`/api/members/get/${memberId}`);
        console.log('userInfo: ',response.data)
        setUserInfo(response.data[0]);
        //const response2 = await axios.get(`/api/members/topCategories/${memberId}`);
        //console.log("top4data",response2.data)
      }
      catch(error){
        new Error(error);
      }
    }
    fetchUserInfo();
  }, [])
  return (
    <>
      <div className='mypage-header-wrap'>
        <Link to={'/home'}><img src={backward} alt='backward-image' /> </Link>
        <h1>마이페이지</h1>
        <img src={option} className='option' alt='option-image' />
      </div>
      <Profile userInfo={userInfo} handleLogout={handleLogout}/>
      <Bar userInfo={userInfo} dummydata={dummydata}/>
      <Top top4data={top4data}/>
      <TimeModal/>
      <Footer footerState={'user'} />
    </>
  )
}

export default Mypage