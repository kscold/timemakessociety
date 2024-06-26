import React, { useEffect, useState } from 'react'
import FeedHeader from './FeedHeader'
import { Link, useParams } from 'react-router-dom'
import backward from '../../../assets/backward.svg';
import axios from 'axios';
import SimilarContent from './SimilarContent';
import FeedLoading from './FeedLoading';
import { useDispatch } from 'react-redux';
import { isGoToSimilarAction } from '../../../store/isGoToSimilar';
function FeedSimilar({ }) {
    const { id, name } = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [similarDataList, setSimilarDataList] = useState([]);
    const memberNickname = localStorage.getItem('memberNickname')
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSimilar = async () => {
            const response = await axios.get(`/api/articles/similarity/${id}`);
            setIsLoading(false);
            console.log("response2 data", response.data);
            setSimilarDataList(response.data)
        }
        fetchSimilar();
    }, [])
    const handleBack=()=>{
        dispatch(isGoToSimilarAction.toggle(true));
    }
    return (
        <div className='similar-wrap'>
            <Link to={`/feed_detail/${name}/${id}`}>
                <img src={backward} alt='backward-image' className='backward-image' onClick={handleBack}/>
            </Link>
            {isLoading ? <FeedLoading isSimilar={true}/> :<SimilarContent memberNickname={memberNickname} name={name} similarDataList={similarDataList} />}
        </div>
    )
}

export default FeedSimilar