import React from 'react'
import profileimage from '../../assets/playing-guitar.png';
function UpdateModal(
  { isMyComment, setNewComment, newComment, setUpdateButton, updateButton, handleUpdateInput, handleUpdate, handleDelete, currentCommentId, goToUpdate, setGotoUpdate, articleId }) {
    const handleSubmit = (event)=>{
      event.preventDefault();
      handleUpdate(currentCommentId,newComment)
    }
  return (
    <>
      <div className='update-modal-bg' onClick={() => { setGotoUpdate(false); setUpdateButton(false) }} />
      <div className='update-modal-wrap' key={currentCommentId}>
        {isMyComment ?
          <>{updateButton ?
            <form className='content-wrap' onSubmit={handleSubmit}>
              <span className='profile' style={{backgroundImage:`url(${profileimage})`}}/>
              <input className='update-modal-input' placeholder='수정할 내용 입력...' onChange={(event) => setNewComment(event.target.value)} />
              <button className='submitButton' type='submit'>입력</button>
            </form>
            : <>
              <button onClick={handleUpdateInput}>수정하기</button>
              <button onClick={() => handleDelete(currentCommentId)}>삭제하기</button>
            </>}
          </>
          :
          <button>신고하기</button>
        }

      </div>
    </>

  )
}

export default UpdateModal