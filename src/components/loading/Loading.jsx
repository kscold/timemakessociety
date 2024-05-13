import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';

// 술사진 로딩 페이지 

const override = {
    display: 'block',
    margin: '0 auto',
    textAlign: 'center',
    color: '#fff',
};


const Loading = ({ loading }) => {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    useEffect(()=>{
        const gotoHome = setInterval(() => {
            setCount((prev)=>prev+1);
        }, 1000);
        
        return()=> clearInterval(gotoHome);
    },[])
    useEffect(()=>{
        if(count===2){
            navigate('/home');
        }
    },[count])
    return (
        <div className='loading-wrap'>
            <GridLoader
                color="#e7e7e7"
                loading={true}
                cssOverride={override}
                size={25}
                speedMultiplier={0.8}
                margin={5}
            />
                <h3> 데이터를 불러오고 있어요 </h3>
            
        </div>
    )
}

export default Loading