import { useState, useCallback, useEffect, useRef } from 'react';
import usePost from '../hooks/usePost';
import useAlert from '../hooks/useAlert';
import useMode from '../hooks/useMode';
import { BsThreeDotsVertical } from "react-icons/bs";



const PostCard = ({ data }) => {
  const { darkMode } = useMode();
  const {userPosts} = usePost();
  const postCardRef = useRef(null);
  const [showActions, setShowActions] = useState(false);
  const { setShow, setAlert } = useAlert();
  const [editClicked, setEditClicked] = useState(false);
  

  const [postState, setPostState] = useState({
    _id: data._id,
    title: data.title,
    description: data.description,
    map: data.map
  });

  const isValidMapLink = /^https:\/\/(www\.)?google\.(com|[a-z]{2})\/maps\/place\/[^\s]+|^https:\/\/maps\.app\.goo\.gl\/[^\s]+$/.test(postState.map);

  const { editPost, deletePost } = usePost();

  const editHandleClick = useCallback(async() => {
    const response = await editPost(postState._id, postState.title, postState.description, postState.map) || false;
    if(response && userPosts){
      const dataIndex = userPosts?.findIndex(userPost => userPost._id === postState._id);
      userPosts[dataIndex] = response.post;
    }
    
    setEditClicked(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editPost, postState, setShow, setAlert]);

  const handleDeleteClick = useCallback(() => {
    deletePost(data._id);
    
    setShowActions(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data._id, deletePost, setShow, setAlert]);
  console.log(showActions)
  const handleEditClick = useCallback(() => {
    setShowActions(false);
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

    // Detect clicks outside of the component
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (postCardRef.current && !postCardRef.current.contains(event.target)) {
          setShowActions(false);
        }
      };
  
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      
      return () => {
        // Unbind the event listener on cleanup
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [postCardRef]);

  console.log('i am running from postcard component');

  return (
    <div className='py-2'>
      <div className={`card postcard-component position-relative`} ref={postCardRef}>

        {
          showActions &&
          <div className='postcard-actions-list'>
            <p onClick={handleEditClick}>Edit</p>
            <p onClick={handleDeleteClick}>Delete</p>
          </div>
        }
        <div className={`${darkMode ? "dark-mode" : ""} dark-mode-transition card-body`} style={{borderRadius: "5px"}}>
          {!editClicked ? (
            <>
              <div className='d-flex postcard-actions justify-content-between align-items-center my-0 mb-3'>
                <p className='posted-on my-0'>
                  {new Date(data.updatedAt).toLocaleDateString("en-us", { year: "numeric", month: "long", day: "numeric" })} at {new Date(data.updatedAt).getHours()}:{new Date(data.updatedAt).getMinutes().toString().padStart(2, "0")}
                </p>
                <BsThreeDotsVertical cursor={"pointer"} onClick={() => setShowActions(!showActions)} />
              </div>
              <h5 className="card-title">{data.title}</h5>
              <p className="card-text">{data.description}</p>

              {data.createdAt !== data.updatedAt && (
                <p className="posted-on my-0 mt-2 text-end">
                  Edited on {new Date(data.updatedAt).toLocaleDateString("en-us", { year: "numeric", month: "long", day: "numeric" })} at {new Date(data.updatedAt).getHours()}:{new Date(data.updatedAt).getMinutes().toString().padStart(2, "0")}
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
              <div className='mb-3'>
                <input
                  type="text"
                  className="form-control"
                  id="map"
                  name="map"
                  value={postState.map}
                  onChange={handleInputChange}
                />
              </div>
              {
                  !isValidMapLink && postState.map && (
                    <div style={{color: darkMode ? "yellow": "red", marginBottom: "10px"}}>
                      Please enter a valid google map link
                    </div>
                  )
                }
              
              <button className="btn btn-success btn-sm inline-block" onClick={editHandleClick}>
                Save Changes
              </button>
              <button className="btn btn-danger btn-sm mx-1 inline-block" onClick={handleGoBackClick}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default PostCard;
