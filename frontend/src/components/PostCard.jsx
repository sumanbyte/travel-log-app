import { useState, useCallback } from 'react';
import usePost from '../hooks/usePost';
import useAlert from '../hooks/useAlert';
import useMode from '../hooks/useMode';
import { BsThreeDotsVertical } from "react-icons/bs";



const PostCard = ({ data }) => {
  const {darkMode} = useMode();
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
    <div className='py-2'>   
       <div className="card postcard-component">
      <div className={`${darkMode ? "dark-mode" : ""} dark-mode-transition card-body`}>
        {!editClicked ? (
          <>
          <div className='d-flex postcard-actions justify-content-between align-items-center my-0 mb-3'>
            <p className='posted-on my-0'>
            {new Date(data.updatedAt).toLocaleDateString("en-us", { year: "numeric", month: "long", day: "numeric" })} at {new Date(data.updatedAt).getHours()}:{new Date(data.updatedAt).getMinutes()}
            </p>
            <BsThreeDotsVertical />
          </div>
            <h5 className="card-title">{data.title}</h5>
            <p className="card-text">{data.description}</p>

            {data.createdAt !== data.updatedAt && (
              <p className="posted-on my-0 mt-2 text-end">
                Edited on {new Date(data.updatedAt).toLocaleDateString("en-us", { year: "numeric", month: "long", day: "numeric" })} at {new Date(data.updatedAt).getHours()}:{new Date(data.updatedAt).getMinutes()}
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
    </div>

  );
};

export default PostCard;
