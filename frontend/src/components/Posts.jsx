import Loading from '../assets/loading-component/Loading';
import usePost from '../hooks/usePost';
import useMode from '../hooks/useMode';

const Posts = () => {
  const { allPosts, loading, error } = usePost();
  const { darkMode } = useMode();

  console.log("i am running from Posts component")

  console.log(allPosts)

  return (
    <div className={`${darkMode ? "dark-mode" : ""} dark-mode-transition`} style={{ minHeight: "100vh" }}>
      <div className={`pt-3 container`}>

        {
          loading ?
            <Loading />
            : error ? error :
              allPosts && allPosts.map((post) => {
                return <div key={post._id} className={`py-2`}>
                  <div className={`card`}>
                    <div className={`card-body ${darkMode ? "dark-mode" : ""} dark-mode-transition`} style={{ borderRadius: "5px" }}>
                      <p className='text-end' style={{ fontSize: "12px" }}>{new Date(post.createdAt).toLocaleDateString("en-us", { year: "numeric", month: "long", day: "numeric" })} at {new Date(post.createdAt).getHours()}:{new Date(post.createdAt).getMinutes().toString().padStart(2, "0")} </p>
                      <h5 className="card-title fs-2 mt-3 mb-2 font-owsald">{post.title}</h5>
                      <p className="card-text" style={{ fontSize: "14px" }}>{post.description}</p>
                      <a className="btn btn-primary btn-sm" href={`/post/${post._id}`}>View More</a>

                    </div>
                  </div>
                </div>
              })
        }
      </div>
    </div>
  )
}

export default Posts