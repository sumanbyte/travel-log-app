import { useEffect } from 'react';
import Loading from '../assets/loading-component/Loading';
import usePost from '../hooks/usePost';


const Posts = () => {
  const { allPosts, allUserPosts } = usePost();
  
  useEffect(() => { 
    allUserPosts();
        // eslint-disable-next-line
  }, [])

  console.log("i am running from Posts component")


  return (
    <div className='mt-3 container'>
      <div className="container-fluid py-3 px-0">
        <h1 className="display-5 fw-bold font-owsald">View All Posts</h1>
        <p className="col-md-8 fs-6">You can like, comment other user posts from here.</p>
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