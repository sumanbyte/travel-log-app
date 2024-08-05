import {useState} from 'react'
import usePost from '../hooks/usePost';
import useAlert from '../hooks/useAlert';
 
const PostCard = (props) => {
  const {setShow, setAlert} = useAlert()
  const [editClicked, setEditClicked] = useState(false);
  const [postState, setPostState] = useState({
    _id: props.data._id,
    title: props.data.title,
    description: props.data.description,
  })

  const {editPost, deletePost} = usePost()
  
  const editHandleClick = (id, title, description)=> {
    editPost(id, title, description)
    setShow(true);
    setAlert({
      color: 'success',
      type: 'Success',
      message: "Post edited successfully"
    })
    setEditClicked(false);
  }

  const onChange = (e)=> {
    setPostState({
      ...postState,
      [e.target.name] :e.target.value
    })
  }


  return (
    <div className="card my-2">
      <div className="card-body">

        {
          !editClicked ?
            <>
             <p><b>Posted On:</b> {new Date(props.data.createdAt).toLocaleDateString()} {new Date(props.data.createdAt).toLocaleTimeString()} </p>

              <h5 className="card-title">{props.data.title}</h5>
              <p className="card-text">{props.data.description}</p>
              <button className="btn btn-success btn-sm mx-1" onClick={()=> {
                setEditClicked(true)
              }}>Edit</button>
              <button className="btn btn-danger btn-sm " onClick={()=> {
                deletePost(props.data._id);
                setShow(true);
                setAlert({
                  color: 'danger',
                  type: 'Success',
                  message: "Post Deleted successfully"
                })
              }}>Delete</button>
               {
                  props.data.createdAt !== props.data.updatedAt ? 
                  <p className="posted-on text-end">Last edited on {new Date(props.data.updatedAt).toLocaleDateString()} {new Date(props.data.updatedAt).toLocaleTimeString()}</p>
                  : ''
                }
            </>
            :
            <div className=" ">

              <div className="mb-3">
                <input type="text" className="form-control" id="title" name='title' value={postState.title} onChange={onChange}/>
              </div>
              <div className="mb-3">
                <textarea className="form-control" id="description" rows="3" name='description' value={postState.description} onChange={onChange} onKeyDown={(e)=> {
                  if(e.code === 'Enter'){
                    e.preventDefault();
                    editHandleClick(postState._id, postState.title, postState.description)
                  }
                }}></textarea>
              </div>
              <button className="btn btn-success btn-sm mx-1" onClick={(e)=> {
                editHandleClick(postState._id, postState.title, postState.description)
              }}>Save Changes</button>
              <button className="btn btn-danger btn-sm mx-1" onClick={()=> {
                setEditClicked(false);
              }}>Go Back</button>

            </div>

        }
      </div>
    </div>
  )
}

export default PostCard