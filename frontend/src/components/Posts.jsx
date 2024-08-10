import { useEffect } from 'react';
import Loading from '../assets/loading-component/Loading';
import usePost from '../hooks/usePost';
import useMode from '../hooks/useMode';


const Posts = () => {
  const { allPosts, allUserPosts, loading } = usePost();
  const { darkMode } = useMode();


  console.log(allPosts);
  useEffect(() => {
    allUserPosts();
    // eslint-disable-next-line
  }, [])

  console.log("i am running from Posts component")


  return (
    <div className={`${darkMode ? "dark-mode" : ""} dark-mode-transition`}>
      <div className={`pt-3 container`}>
        <div className="container-fluid py-3 px-0">
          <h1 className="display-5 fw-bold font-owsald">View All Posts</h1>
          <p className="col-md-8 fs-6">You can like, comment other user posts from here.</p>
        </div>


        {
          loading ?
            <Loading />
            : !allPosts ? "Some error occured" :
              allPosts.map((post) => {
                return <div key={post._id} className={`card my-2`}>
                  <div className={`card-body dark-mode`}>
                    <p className='text-end' style={{ fontSize: "12px" }}>{new Date(post.createdAt).toLocaleDateString("en-us", { year: "numeric", month: "long", day: "numeric" })} at {new Date(post.createdAt).getHours()}:{new Date(post.createdAt).getMinutes()} </p>
                    <h5 className="card-title fs-2 mt-3 mb-2 font-owsald">{post.title}</h5>
                    <p className="card-text" style={{ fontSize: "14px" }}>{post.description}</p>
                    <a className="btn btn-primary btn-sm" href={`/post/${post._id}`}>View More</a>

                  </div>
                </div>
              })
        }
      </div>
    </div>
  )
}

export default Posts