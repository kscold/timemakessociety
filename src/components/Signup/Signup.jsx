import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import backward from '../../assets/backward.svg';
import idimg from '../../assets/signup/id-img.svg';
import pwimg from '../../assets/signup/pw-img.svg';
import nameimg from '../../assets/signup/name-img.svg';
import phoneimg from '../../assets/signup/phone-img.svg';

function Signup() {
    const [userInfo, setUserInfo] = useState({
        'loginId': '',
        'password': '',
        'memberName': '',
        'memberNickname': '',
    })
    const [isData, setIsData] = useState(true)
    const [isEmptyState, setIsEmptyState] = useState(false)
    const navigate = useNavigate()
    const handleInputChange = (identifier, value) => {
        setUserInfo(preValue => ({
            ...preValue,
            [identifier]: value
        }))
    }
    console.log('signupState: ', userInfo.memberNickname)
    const handleSubmit = async (event) => {
        // - api 통신부분 -
        event.preventDefault();
        const isEmpty = userInfo.loginId === '' || userInfo.password === '' || userInfo.memberName === '' || userInfo.memberNickname === ''
        if (isEmpty) {
            setIsData(true)
            setIsEmptyState(true)
        }
        else {
            try {
                const response = await axios.post('/api/members/signup', {
                    "loginId": userInfo.loginId,
                    "password": userInfo.password,
                    "memberName": userInfo.memberName,
                    'memberNickname': userInfo.memberNickname,
                })
                console.log(response.data)
                navigate('/login');
            }
            catch (error) {
                new Error(error)
                setIsEmptyState(false)
                setIsData(false)
            }
        }


    }
    const handleBackward = () => {
        navigate('/');
    }
    return (
        <>
            <div className='signup-header-wrap'>
                <img src={backward} alt='backward' onClick={handleBackward} className='backward' />
                <h1 className='signup-header'>회원가입</h1>
            </div>
            <form onSubmit={handleSubmit} className='signup-content-wrap'>
                <label >아이디</label>
                <input placeholder='아이디를 입력해주세요.' name='loginId' onChange={(event) => handleInputChange('loginId', event.target.value)} style={{ backgroundImage: `url(${idimg})` }} />
                <label >비밀번호</label>
                <input placeholder='비밀번호를 입력해주세요.' name='password' onChange={(event) => handleInputChange('password', event.target.value)} style={{ backgroundImage: `url(${pwimg})` }} />
                <input placeholder='비밀번호 확인' style={{ backgroundImage: `url(${pwimg})` }} />
                <label >이름</label>
                <input placeholder='이름을 입력해주세요.' onChange={(event) => handleInputChange('memberName', event.target.value)} style={{ backgroundImage: `url(${nameimg})` }} />
                <div className='nickname-wrap'>
                    <label className='nickname-label' >닉네임</label>
                    {/* <button type='button' className='overlap'>중복확인</button> */}
                </div>

                <input placeholder='닉네임을 입력해주세요.' name='memberName' onChange={(event) => handleInputChange('memberNickname', event.target.value)} style={{ backgroundImage: `url(${nameimg})` }} />
                <label >휴대폰 번호</label>
                <input placeholder='휴대폰 번호를 입력해주세요.' style={{ backgroundImage: `url(${phoneimg})` }} />
                {isData ? '' : <p className='isData'>이미 있는 이름과 아이디입니다.</p>}
                {isEmptyState ? <p className='isData'>모든 정보 기입해주세요.</p> : ''}
                <button type='submit' className='signup-button'>가입하기</button>
            </form>
        </>


    )
}

export default Signup