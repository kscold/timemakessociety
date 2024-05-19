import axios from 'axios';
import React, { useEffect, useState } from 'react';

import option from '../../assets/option.svg';
import profileimage from '../../assets/playing-guitar.png';
import UpdateModal from './UpdateModal';

function CommentModal({ id,setCommentState, articleId, handleComment }) {
  const [commentData, setCommentData] = useState([]);
  const [buttonState, setButtonState] = useState('최신순');
  const memberName = localStorage.getItem('memberName');
  const memberNickName = localStorage.getItem('memberNickName');
  const [newComment, setNewComment] = useState('');
  const [updateListState, setUpdateListState] = useState([]);
  const [goToUpdate, setGotoUpdate] = useState(false);//updateModal 창 띄울지 말지 결정
  const [currentCommentId, setCurrentCommentId] = useState();//option버튼 눌렀을 때 댓글 id
  const [currentCommentName,setCurrentCommentName] = useState('');//option버튼 눌렀을 때 댓글 작성자
  const [updateButton,setUpdateButton] = useState(false);
  //console.log('articleid',id)
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.get(`/api/comment/${id}`);
        console.log('comment fetch',response.data)
        setCommentData(response.data);
        
      }
      catch (error) {
        new Error(error)
      }
    }
    fetchComment();
  }, [buttonState,commentData])
  const toggleButton = (title) => {
    setButtonState(title)
  }
  //수정 모달창 띄우는 이벤트 핸들러
  const handleOptionToggle = (id,name) => {
    const newOptionState = {}
    commentData.forEach((data, index) => {
      if (data.id === id ) {
        newOptionState[data.id] = {
          id: data.id,
          state: true
        }
      }
      else {
        newOptionState[data.id] = {
          id: data.id,
          state: false
        }
      }
    })
    setUpdateListState(newOptionState);
    setCurrentCommentId(id);
    setCurrentCommentName(name);
    setGotoUpdate(!goToUpdate)
  }
  //댓글 post
  const handleSubmit = async (event) => {
    event.preventDefault();
     try{
       const response = await axios.post(`/api/comment/${id}`,{
         "content": newComment,
       })
       console.log('post 댓글: ',response.data)
     }
     catch(error){
       new Error(error)
     }
    const newId = commentData.length + 1
    setCommentData((preValue) => ([
      {
        //id: newId,
        memberName: memberName,
        content: newComment
      }, ...preValue,
    ]))
    setNewComment('')
  }
  //댓글 수정
  const handleUpdate=async(id,value) =>{
    
    try {
      const response = await axios.put(`/api/comment/${articleId}/${id}`, {
        "content": value,
      })
      console.log(response.data)
    }
    catch (error) {
      new Error(error)
    }
    const newCommentData =commentData.length>0 &&commentData.map((comment) => {
      if(comment.id===id){
        return{
          ...comment,
          content:value,
        }
      }
      return comment;
    })
    setCommentData(newCommentData);
    setNewComment('')
    setGotoUpdate(false)
  }
  //댓글 삭제
  const handleDelete = async (id) => {
     try {
       const response = await axios.delete(`/api/comment/${articleId}/${id}`)
       console.log(response.data)
     }
     catch (error) {
       new Error(error)
     }
    const newRemove = [...commentData];
    const result = newRemove.filter((data) => data.id !== id)
    console.log("remove결과", newRemove);
    setCommentData(result)
    setGotoUpdate(false)
  }
  const handleUpdateInput=()=>{
    setUpdateButton(!updateButton)
  }
  const isMyComment = updateListState[currentCommentId]?.state && memberName === currentCommentName;
   
   // console.log("name",currentCommentName)
  return (
    <>
      <div className='bg-dark' onClick={() => setCommentState(false)} />
      <div className='commentModal-wrap'>
        <div className='header-wrap'>
          <div className='header-bar-wrap'>
            <span className='header-bar' onClick={handleComment} />
          </div>
          <h1 className='header'>댓글</h1>
          <div className='button-wrap'>
            <button
              className={`${buttonState === '최신순' ? 'button active' : 'button'}`}
              onClick={() => toggleButton('최신순')}
            >최신순</button>
          </div>
        </div>
        <span className='line' />

        <div className='content-wrap'>
          {commentData.length>0&&commentData.map((comment, index) => (
            <div className='content' key={comment.id}>
              <div className='profile-image' style={{ backgroundImage: `url(${profileimage})` }} />
              <div className='comment-wrap'>
                <p className='nickname'>
                  {comment.memberName}
                  <img src={option} className='option' onClick={() => handleOptionToggle(comment.id,comment.memberName)} />
                 
                </p>
                <p className='text'>{comment.content}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
      {goToUpdate ? <UpdateModal setNewComment={setNewComment} newComment={newComment} setUpdateButton={setUpdateButton} updateButton={updateButton} handleUpdateInput={handleUpdateInput} isMyComment={isMyComment} currentCommentId={currentCommentId} handleUpdate={handleUpdate} handleDelete={handleDelete} goToUpdate={goToUpdate} setGotoUpdate={setGotoUpdate} /> : ''}
      <form className='comment-footer' onSubmit={handleSubmit}>
        <span className='profile' style={{ backgroundImage: `url(${profileimage})` }} />
        <input className='input' placeholder='댓글추가...' name='comment' id='comment' value={newComment} onChange={(event) => setNewComment(event.target.value)} />
        <button type='submit' className='submitButton'>입력</button>
        
      </form>

    </>
  )
}

export default CommentModal