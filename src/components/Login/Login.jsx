import React, { useState } from 'react';
import {useDispatch} from 'react-redux';

import backWord from '../../assets/backward.svg';
import Tms from '../../assets/start/TmsLogo.svg';
import { Link,useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth';
import axios from 'axios';
import { loginActions } from '../../store/Login';
const dummydata = [
  {
      "loginId": "lhj6364",
      "password": "1234",
      "memberName": "임형준",
  }
]
function Login() {
  const [enterValue, setEnterValues] = useState({
    loginId: '',
    password: '',
    memberName:'임형준',
  })
  const dispatch = useDispatch()
  const [showPassWord,setShowPassWord] = useState(false);
  const navigate=useNavigate()
  const handleBack=()=>{
    navigate('/')
  }
  const handleInputChange=(identifier, value) => {
    setEnterValues(preValues=>({
      ...preValues,
      [identifier]:value
    }))
    
  }
  const handleLogin=async(event)=>{
    event.preventDefault();
    //-- Api post 연결 code --
    try{
      const response=await axios.post(`/api/login`,{
        "loginId": enterValue.loginId,
        "password": enterValue.password
      })
      console.log(response.data)
    }
    catch(error){
      new Error(error)
    }
    
    localStorage.setItem('loginId',enterValue.loginId)
    localStorage.setItem('password',enterValue.password)
    localStorage.setItem('memberName',enterValue.memberName)
    dispatch(loginActions.login(enterValue))
    dispatch(authActions.login());
    navigate('/category');
  }
  const passwordInputType = showPassWord ? 'text' : 'password';
  const handleShowPassWord=()=>{
    setShowPassWord(!showPassWord)
  }
  return (
    <>
      <div className='login-header-wrap'>
        <img src={backWord} className='backword' alt='backword-img' onClick={handleBack}/>
        <p className='login-header'>로그인</p>
      </div>

      <form className='login-content-wrap' onSubmit={handleLogin}>
        <img src={Tms} className='login-logo' alt='TmsLogo' />
        <input placeholder='아이디' id='loginId' name='loginId' className='login-input' onChange={(event)=> handleInputChange('loginId',event.target.value)}/>
        <input placeholder='비밀번호' id='password' name='password' type={passwordInputType} className='login-input' onChange={(event)=> handleInputChange('password',event.target.value)} />
        <label className='login-checkbox'>
          <input type="checkbox" className={`pw-checkbox ${showPassWord ? 'active' : ''} `} checked={showPassWord} onChange={handleShowPassWord} /> 비밀번호 보기
        </label>
        <button type='submit' className='login-submit' >로그인</button>
        <Link to='/signup' className='goto-signup'>회원가입</Link>
      </form>
    </>

  )
}

export default Login