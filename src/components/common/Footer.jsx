import React from 'react';
import { Link } from 'react-router-dom';

import feed from '../../assets/common/feed.svg';
import user from '../../assets/common/user.svg';
import home from '../../assets/common/home.svg';
function Footer({footerState}) {
  return (
    <footer className='footer-wrap'>
        <Link to='/home'>
          <span className={footerState==='home'?`footer-button active`:'footer-button'}>
            <img src={home} className='footer-image'/> 
          </span>
        </Link> 
        <Link to='/feed'>
          <span className={footerState==='feed'?`footer-button active`:'footer-button'}>
            <img src={feed} className='footer-image'/>
          </span>
        </Link> 
        <Link to='/mypage'>
          <span className={footerState==='user'?`footer-button active`:'footer-button'}>
            <img src={user} className='footer-image'/>
          </span>
        </Link> 
    </footer>
  )
}

export default Footer