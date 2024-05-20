import React from 'react'
import { Link } from 'react-router-dom'

function SimilarContent({ similarDataList,name,memberNickname }) {
    return (
        <div className='content-wrap'>
            <p className='memberNickname'>
                {memberNickname}
                <span className='similar-text'>님에게</span>
            </p>
            <p className='similar-text'>유사 기사를 추천해드려요!</p>
            {similarDataList.map((item) => (
                <Link to={`/feed_detail/${name}/${item.id}`} key={item.id}>
                    <div  className='content'>
                        <img src={item.image} className='content-image' />
                        <div className='content-title-wrap'>
                            <h1>{item.title}</h1>
                            <p className='category'>{item.category}</p>
                            <p className='time'>유사도{item.similarity}</p>
                        </div>

                    </div>
                </Link>
            )
            )}
        </div>
    )
}

export default SimilarContent