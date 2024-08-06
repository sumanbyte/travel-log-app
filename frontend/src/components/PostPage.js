import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAlert from '../hooks/useAlert';
import Loading from '../assets/loading-component/Loading';
import jwt_decode from 'jwt-decode';
import { MdOutlineReply } from 'react-icons/md';

const PostPage = () => {
  const { setShow, setAlert } = useAlert();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const postID = location.pathname.split('/')[2];
  const decodedJWT = localStorage.getItem('auth-token') ? jwt_decode(localStorage.getItem('auth-token')) : null;

  const fetchPost = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/post/getpost/${postID}`);
    const data = await response.json();
    if (data.post) {
      setPost(data.post);
    } else {
      navigate('/');
    }
  }, [navigate, postID]);

  const fetchComments = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/post/getcomments/${postID}`);
    const data = await response.json();
    setAllComments(data);
  }, [postID]);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [fetchPost, fetchComments]);

  const handleCommentPost = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/post/commentpost/${postID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({ comment, userID: decodedJWT.user.id }),
    });
    const data = await response.json();
    if (data.status) {
      setComment('');
      fetchComments();
    }
  };

  const handleLikePost = async () => {
    if (!localStorage.getItem('auth-token')) {
      setShow(true);
      setAlert({
        color: 'danger',
        type: 'Failed',
        message: 'You need to be logged in to like the post',
      });
      return;
    }
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/post/likepost/${postID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
      },
    });
    const data = await response.json();
    if (data.status) {
      setShow(true);
      setAlert({
        color: 'success',
        type: 'Success',
        message: data.message,
      });
    }
    fetchPost();
  };

  return (
    <div className="mt-5 container font-open">
      <div className="container-fluid py-5">
        {post ? (
          <>
            <div className="d-flex flex-wrap justify-content-between align-items-center">
              <p>
                <b>Posted On:</b> {new Date(post.createdAt).toLocaleDateString()}{' '}
                {new Date(post.createdAt).toLocaleTimeString()}
              </p>
              <p>Posted by {post.userID.name}</p>
            </div>
            <h1 className="display-6 fw-bold font-owsald">{post.title}</h1>
            <p className="col-md-12 fs-5">{post.description}</p>
            <button className="btn btn-primary btn-sm" onClick={handleLikePost}>
              <span>{post.likes.length - 1} </span>Like
            </button>
            {post.createdAt !== post.updatedAt && (
              <p className="posted-on text-end">
                Last edited on {new Date(post.updatedAt).toLocaleDateString()}{' '}
                {new Date(post.updatedAt).toLocaleTimeString()}
              </p>
            )}
            <h2 className="display-7 fw-bold mt-5 font-owsald">Leave a comment</h2>
            {localStorage.getItem('auth-token') ? (
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="1"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
                <button
                  className="btn btn-primary btn-sm mt-1"
                  onClick={handleCommentPost}
                  disabled={comment.length <= 3}
                >
                  Comment
                </button>
              </div>
            ) : (
              <h5>You need to be logged in to comment the post or like</h5>
            )}
            <div className="container px-0 my-5 py-5">
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="card text-dark">
                    <div className="card-body p-4">
                      <h4 className="mb-0 font-owsald">Recent comments</h4>
                      <p className="fw-light mb-4 pb-2">Latest Comments section by users</p>
                      {!allComments ? (
                        <Loading />
                      ) : allComments.length === 0 ? (
                        <h1>No comments found for this post.</h1>
                      ) : (
                        allComments.map((comment) => (
                          <div key={comment._id}>
                            <hr />
                            <div className="d-flex flex-start mt-4 font-open">
                              <img
                                className="rounded-circle shadow-1-strong me-3"
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
                                alt="avatar"
                                width="60"
                                height="60"
                              />
                              <div style={{ width: '100%' }}>
                                <h6 className="fw-bold mb-1">{comment.userName}</h6>
                                <div
                                  className="d-flex align-items-center justify-content-between mb-1"
                                  style={{ width: '100%' }}
                                >
                                  <span className="badge bg-primary" style={{ fontSize: '13px' }}>
                                    {comment.userID.name}
                                  </span>
                                  <p className="mb-0 mx-2" style={{ fontSize: '15px' }}>
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <p className="mb-0">{comment.comment}</p>
                                  <MdOutlineReply className="cursor-pointer mx-2" size={20} title="Reply" />
                                </div>
                              </div>
                            </div>
                            <hr />
                          </div>
                        ))
                      )}
                    </div>
                    <hr className="my-0" />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default PostPage;
