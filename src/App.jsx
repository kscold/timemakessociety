import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import './scss/style.scss';

const Start = lazy(() => import('./components/Start/Start'));
const Signup = lazy(() => import('./components/Signup/Signup'));
const Login = lazy(() => import('./components/Login/Login'));
const Category = lazy(()=>import('./components/category/Category'));
const TimeSet = lazy(()=>import('./components/Timeset/TimeSet'));
const Main = lazy(() => import('./components/Main/Main'));
const Feed = lazy(() => import('./components/Feed/Feed'));
const Mypage = lazy(() => import('./components/Mypage/Mypage'));
const FeedDetail = lazy(()=>import('./components/Feed/FeedDetail/FeedDetail'));
const UpdateModal = lazy(()=>import('./components/Modal/UpdateModal'));
const TimeOut = lazy(()=>import('./components/timeOut/TimeOut'));
const Similar = lazy(()=>import('./components/Feed/FeedDetail/FeedSimilar'));
const CategoryArticles = lazy(()=> import('./components/CategoryArticles/CategoryArticles'));
import Loading from './components/loading/Loading';
import Entrance from './components/Entrance/Entrance';
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading loading={true}/>}>
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/category' element={<Category />} />
          <Route path='/timeset' element={<TimeSet />} />
          <Route path='/home' element={<Main />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/feed_detail/:name/:id' element={<FeedDetail />} />
          <Route path='/timeout' element={<TimeOut/>}/>
          <Route path='/loading' element={<Loading loading={true}/>}/>
          <Route path='/entrance' element={<Entrance/>}/>
          <Route path='/similar/:name/:id' element={<Similar/>}/>
          <Route path='/category_articles/:name' element={<CategoryArticles/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
