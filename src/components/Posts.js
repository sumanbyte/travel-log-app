import { useEffect, useState } from 'react';
import Loading from '../assets/loading-component/Loading';
import usePost from '../hooks/usePost';


const Posts = () => {
  const { allPosts, allUserPosts } = usePost();
  const [user, setUser] = useState(null)
  
  const getUser = async (userID)=> {
        // get user corressponding to a userID
    console.log(userID)
  }
  

  useEffect(() => { 
    allUserPosts()

  }, [])

  return (
    <div className='mt-5 container'>
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">View All Posts</h1>
        <p className="col-md-8 fs-4">You can like, comment other user posts from here.</p>
      </div>


      {
        allPosts ?
          allPosts.map((post) => {
            return <div key={post._id} className="card my-2">
              <div className="card-body">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <p><b>Posted On:</b> {new Date(post.createdAt).toLocaleDateString()} {new Date(post.createdAt).toLocaleTimeString()} </p>
                  <p>Posted by {post.userID.name}</p>

                </div>
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
                <a className="btn btn-primary btn-sm" href={`/post/${post._id}`}>View More</a>
                {
                  post.createdAt !== post.updatedAt ?
                    <p className="posted-on text-end">Last edited on {new Date(post.updatedAt).toLocaleDateString()} {new Date(post.updatedAt).toLocaleTimeString()}</p>
                    : ''
                }

              </div>
            </div>
          })
          :
          <Loading />
      }
    </div>
  )
}

export default Posts