import React, { useState, useEffect, useCallback } from 'react';
import Loading from '../assets/loading-component/Loading';
import PostCard from './PostCard';
import usePost from '../hooks/usePost';
import useAlert from '../hooks/useAlert';

export const Discuss = () => {
  const { setShow, setAlert } = useAlert();
  const [userData, setUserData] = useState({ title: '', description: '' });
  const { getAllPost, userPosts, loading, createPost } = usePost();

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
console.log("i am running from discuss component")
  return (
    <div className="container my-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
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

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
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
        <button
          disabled={userData.title.length <= 3 || userData.description.length <= 3}
          className="btn btn-primary my-1 text-right"
          onClick={handleClick}
        >
          Create Post
        </button>
      </div>

      <div className="post-card">
        {loading ? (
          <div className="text-center">
            <Loading />
          </div>
        ) : userPosts.length <= 0 ? (
          "Haha, you've no posts kid"
        ) : (
          userPosts.map((data) => <PostCard key={data._id} data={data} />)
        )}
      </div>
    </div>
  );
};
