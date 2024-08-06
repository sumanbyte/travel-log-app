import { useState, useCallback } from 'react';
import usePost from '../hooks/usePost';
import useAlert from '../hooks/useAlert';

const PostCard = ({ data }) => {
  const { setShow, setAlert } = useAlert();
  const [editClicked, setEditClicked] = useState(false);
  const [postState, setPostState] = useState({
    _id: data._id,
    title: data.title,
    description: data.description,
  });

  const { editPost, deletePost } = usePost();

  const editHandleClick = useCallback(() => {
    editPost(postState._id, postState.title, postState.description);
    setShow(true);
    setAlert({
      color: 'success',
      type: 'Success',
      message: 'Post edited successfully',
    });
    setEditClicked(false);
  }, [editPost, postState, setShow, setAlert]);

  const handleDeleteClick = useCallback(() => {
    deletePost(data._id);
    setShow(true);
    setAlert({
      color: 'danger',
      type: 'Success',
      message: 'Post Deleted successfully',
    });
  }, [data._id, deletePost, setShow, setAlert]);

  const handleEditClick = useCallback(() => {
    setEditClicked(true);
  }, []);

  const handleGoBackClick = useCallback(() => {
    setEditClicked(false);
  }, []);

  const handleInputChange = useCallback((e) => {
    setPostState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.code === 'Enter') {
        e.preventDefault();
        editHandleClick();
      }
    },
    [editHandleClick]
  );

  console.log('i am running from postcard component');

  return (
    <div className="card my-2">
      <div className="card-body">
        {!editClicked ? (
          <>
            <p>
              <b>Posted On:</b> {new Date(data.createdAt).toLocaleDateString()}{' '}
              {new Date(data.createdAt).toLocaleTimeString()}
            </p>
            <h5 className="card-title">{data.title}</h5>
            <p className="card-text">{data.description}</p>
            <button className="btn btn-success btn-sm mx-1" onClick={handleEditClick}>
              Edit
            </button>
            <button className="btn btn-danger btn-sm" onClick={handleDeleteClick}>
              Delete
            </button>
            {data.createdAt !== data.updatedAt && (
              <p className="posted-on text-end">
                Last edited on {new Date(data.updatedAt).toLocaleDateString()}{' '}
                {new Date(data.updatedAt).toLocaleTimeString()}
              </p>
            )}
          </>
        ) : (
          <div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={postState.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                id="description"
                rows="3"
                name="description"
                value={postState.description}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              ></textarea>
            </div>
            <button className="btn btn-success btn-sm mx-1" onClick={editHandleClick}>
              Save Changes
            </button>
            <button className="btn btn-danger btn-sm mx-1" onClick={handleGoBackClick}>
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
