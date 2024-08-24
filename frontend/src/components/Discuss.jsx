import { useState, useEffect, useCallback } from 'react';
import Loading from '../assets/loading-component/Loading';
import PostCard from './PostCard';
import usePost from '../hooks/usePost';
import useAlert from '../hooks/useAlert';
import useMode from '../hooks/useMode';

export const Discuss = () => {
  const { setShow, setAlert } = useAlert();
  const [userData, setUserData] = useState({ title: '', description: '', map: "" });
  const { getAllPost, userPosts, loading, error, createPost } = usePost();
  const { darkMode } = useMode();

  const isValidMapLink = /^https:\/\/(www\.)?google\.(com|[a-z]{2})\/maps\/place\/[^\s]+|^https:\/\/maps\.app\.goo\.gl\/[^\s]+$/.test(userData.map);

  

  useEffect(() => {
    getAllPost();
    // eslint-disable-next-line
  }, []);

  const handleChange = useCallback((e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.code === 'Enter') {
        e.preventDefault();
        if (userData.title.length > 3 && userData.description.length > 3) {
          createPost(userData);
          setShow(true);
          setAlert({
            color: 'success',
            type: 'Success',
            message: 'Post Created successfully',
          });
          setUserData({ title: '', description: '' });
        } else {
          setShow(true);
          setAlert({
            color: 'danger',
            type: 'Error',
            message: 'Length must be greater than 3',
          });
        }
      }
    },
    [createPost, setShow, setAlert, userData]
  );

  const handleClick = useCallback(() => {
    createPost(userData);
    setUserData({ title: '', description: '' });
    setShow(true);
    setAlert({
      color: 'success',
      type: 'Success',
      message: 'Post Created successfully',
    });
  }, [createPost, setShow, setAlert, userData]);
  // console.log(userPosts);
  console.log("i am running from discuss component")
  return (
    <div className={`${darkMode ? "dark-mode" : ""} dark-mode-transition`} style={{ minHeight: "calc(100vh - 61px)" }}>
      <div className="container pt-4">
        <div className="mb-2">
          <label htmlFor="title" className="form-label mb-1">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={handleChange}
            value={userData.title}
          />
        </div>


        <div className="mb-4">
          <label htmlFor="description" className="form-label mb-1">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            name="description"
            onChange={handleChange}
            value={userData.description}
            onKeyDown={handleKeyDown}
          ></textarea>

          <div className="mb-2 mt-2">
            <label htmlFor="title" className="form-label mb-1">
              Google Map Link
            </label>
            <input
              type="text"
              className="form-control"
              id="map"
              name="map"
              onChange={handleChange}
              value={userData.map}
            />
          </div>
          {
            !isValidMapLink && userData.map && (
              <div style={{color: darkMode ? "yellow": "red", marginTop: "10px"}}>
                Please enter a valid google map link
              </div>
            )
          }

          <button
            disabled={userData.title.length <= 3 || userData.description.length <= 3 && isValidMapLink }
            className="btn btn-primary btn-responsive mt-2 text-right"
            onClick={handleClick}
          >
            Share
          </button>
          
        </div>

        <div className="post-card">
          {loading ? (
            <div className="text-center">
              <Loading />
            </div>
          ) : error ? error :
            userPosts && userPosts.length <= 0 ? (
              "You don't have any posts."
            ) : (
              userPosts && userPosts.map((data) => <PostCard key={data._id} data={data} />)
            )}
        </div>
      </div>
    </div>
  );
};
