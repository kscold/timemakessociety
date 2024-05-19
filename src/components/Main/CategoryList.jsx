import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
function CategoryList({ item, handleCategoryList }) {
    return (
        <motion.li

            variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: 1 },
            }}
            exit={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }}
            className='main-category-content-wrap'>
            <Link to={`/category_articles/${item.name}`}>
                <div className='category'>
                    <img src={item.img} alt='catgory-image' />
                </div>
            </Link>
            <p className='main-category-content-text'>{item.name}</p>
        </motion.li>
    )
}

export default CategoryList