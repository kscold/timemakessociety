import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { authActions } from '../../store/auth';
import axios from 'axios';
const dummydata=[
    {id:1, name:'문화'},
    {id:2, name:'경제'},
    {id:3, name:'연예'},
    {id:4, name:'정치'},
    {id:5, name:'과학'},
    {id:6, name:'사회'},
    {id:7, name:'스포츠'},
    {id:8, name:'기술'},
    {id:9, name:'해외'},
]
// const memberId = [
//     1 // 현재 로그인한 회원의 memberId가 1
// ]
function Category() {
    const [activeCategory,setActiveCategory] =useState([]);
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth.isAuthenticated)
    const login = useSelector(state => state.login.loginId)
    const handleCategory = (name) =>{
        if(activeCategory.includes(name)){
            setActiveCategory(activeCategory.filter(item => item !== name))
        }
        else{
            setActiveCategory([...activeCategory, name])
        }
    }
    console.log("activeCategory :" , activeCategory)
    console.log('loginState: ',login)
    useEffect(()=>{
        const fetchUserMemberId =async() => {
            try{
                const response = await axios.get('/api/members/memberId');
                console.log("memberId",response.data)
                localStorage.setItem('memberId',response.data);
                //localStorage.setItem('memberId',memberId);
            }
            catch(error){
                new Error(error);
            }
        }
        fetchUserMemberId();
    },[])
    const handleContinue = async() => {
        // - 선택한 카테고리 API통신 추가 코드 작성 -
        try{
            const memberId = localStorage.getItem('memberId');
            const response = await axios.post(`/api/members/${memberId}/tag`,activeCategory)
            console.log(response.data)
        }
        catch(error){
            new Error(error)
        }
        navigate("/timeset")
        
    }
    console.log("auth상태",auth)
  return (
    <div className='category-wrap'>
        <div className='category-header'>
            <h1>관심있는 주제를 모두 선택해주세요</h1>
            <p>관심있는 주제를 한가지 이상 선택해 주세요.<br/>
            내게 꼭 맞는 뉴스를 추천해 드릴게요!
            </p>
            
        </div>
        <div className='category-content-wrap'>
            {dummydata.map((data)=>{
                return (
                    <div className={`category-content ${activeCategory.includes(data.name) ? 'active' : ''} `} 
                        key={data.id} 
                        onClick={() => handleCategory(data.name)}>{data.name} </div>
                )
            })}
            
        </div>
        <button className='continue-button' onClick={handleContinue}>계속하기</button>
    </div>
  )
}

export default Category