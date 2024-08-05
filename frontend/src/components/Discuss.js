import React, { useState, useEffect } from 'react'
import Loading from '../assets/loading-component/Loading'
import PostCard from './PostCard'
import usePost from '../hooks/usePost'
import useAlert from '../hooks/useAlert'

export const Discuss = () => {
  const { setShow, setAlert } = useAlert()
  const [userData, setUserData] = useState({ title: '', description: '' })
  const { getAllPost, userPosts, loading, createPost } = usePost()


  const onChange = (e) => {

    setUserData({ ...userData, [e.target.name]: e.target.value })
  }


  useEffect(() => {
    getAllPost();
    // eslint-disable-next-line
  }, [])


  return (
    <div className='container my-4'>
      {/* <h1>app status: {obj.status}</h1> */}
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name='title' onChange={onChange} value={userData.title} />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control" id="description" rows="3" name='description' onChange={onChange} value={userData.description} onKeyDown={(e) => {
          if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
            e.preventDefault()
            if (userData.title.length > 3 && userData.description.length > 3) {
              createPost(userData);
              setShow(true);
              setAlert({
                color: 'success',
                type: 'Success',
                message: "Post Created successfully"
              })
              setUserData({ title: '', description: '' })
            } else {
              setShow(true);
              setAlert({
                color: 'danger',
                type: 'Success',
                message: "Length must be greater than 3"
              })
            }
          }
        }}></textarea>
        <button disabled={userData.title.length > 3 && userData.description.length > 3 ? false : true} className="btn btn-primary my-1 text-right" onClick={(e) => {
          createPost(userData)
          setUserData({ title: '', description: '' })
          setShow(true);
          setAlert({
            color: 'success',
            type: 'Success',
            message: "Post Created successfully"
          })
        }}>Create Post</button>
      </div>


      <div className="post-card">
        {loading ?
          <div className='text-center'>
            <Loading />
          </div>
          : userPosts.length <= 0 ? "haha you've no posts kid" :
            userPosts.map((data) => {
              return <PostCard key={data._id} data={data} />
            })
        }
      </div>



    </div>
  )
}

