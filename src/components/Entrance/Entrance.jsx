import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Welcome from './Welcome';
import Welcome2 from './Welcome2';
import Welcome3 from './Welcome3';

function Entrance() {
    const [entranceCount, setEntranceCount] = useState(0);
    const [userInfo, setUserInfo] = useState();
    const [isWelcome, setIsWelcome] = useState(true);
    const [isWelcome2, setIsWelcome2] = useState(false);
    const [isWelcome3, setIsWelcome3] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const count = setInterval(() => {
            setEntranceCount((prev) => prev + 1)
        }, 1000);

        return () => clearInterval(count);
    }, [])

    useEffect(() => {
        if (entranceCount === 5) {
            setIsWelcome(false)
            setIsWelcome2(true)
        }
        else if (entranceCount === 10) {
            setIsWelcome2(false)
            setIsWelcome3(true)
        }
         else if (entranceCount === 16) {
            navigate('/category')
         }
    }, [entranceCount])

    useEffect(() => {
        const fetchMemberId = async () => {
            const response = await axios.get('api/members/memberId')
            const response2 = await axios.get(`/api/members/get/${response.data}`)
            console.log(response2.data[0])
            setUserInfo(response2.data[0])
        }

        fetchMemberId();

    }, [])
    console.log('count', entranceCount)
    return (
        <>
            {isWelcome ? <Welcome userInfo={userInfo} /> :
                isWelcome2 ? (<Welcome2/>) : 
                <Welcome3 userInfo={userInfo}/>


            }
        </>

    )
}

export default Entrance