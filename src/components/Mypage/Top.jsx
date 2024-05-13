import React from 'react'

function Top({top4data}) {
    return (
        <div className='top-wrap'>
            <p className='top4'> TOP4</p>
            <p className='small-title'>내 취향 뉴스 한눈에 보기</p>
            {top4data.topCategories.map((data, index) => (
                <div key={index} className='circle'>
                    <p className='percentage'>{data.percentage}%</p>
                    <p className='category'>{data.category}</p>
                </div>

            ))}
        </div>
    )
}

export default Top