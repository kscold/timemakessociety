import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginActions } from '../../store/Login';
import axios from 'axios';
function TimeOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTime = localStorage.getItem('readTime');
  const minute = Math.floor(Number(getTime) / 60);
  const second = Number(getTime) % 60;
  const memberNickname = localStorage.getItem('memberNickname');

  const timeSticks = Array.from({ length: 12 }, (_, index) => (
    <div key={index} className="timeset-stick" />
  ));
  const handleFinish = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(loginActions.logout());
    navigate('/');
  };

  return (
    <div className="timeset-wrap">
      <h1>타임오버</h1>
      <br />
      <p className="timeout-name">
        <span className="timeout-nickname">{memberNickname}님은</span> 방금
      </p>
      <p className="timeout-time">
        {`${minute < 10 ? `0${minute}분` : `${minute}분`}${
          second < 10 ? `0${second}초` : `${second}초`
        }`}
        <span className="timeout-save"> 절약했어요!</span>{' '}
      </p>
      {/*<p className='time'>{'0:00'}</p>*/}
      <div className="timeset-stick-wrap">{timeSticks}</div>

      <button onClick={handleFinish}>끝내기</button>
    </div>
  );
}

export default TimeOut;
