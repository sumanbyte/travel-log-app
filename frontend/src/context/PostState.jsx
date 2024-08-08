import PostContext from "./postContext";
import { useEffect, useState } from "react";
const PostState = (props)=>{
    let loading = false;
    const [userPosts, setUserPosts] = useState(null);
    const [allPosts, setAllPosts] = useState(null)
    const [individualPost, setIndividualPost] = useState(null);

    const getPost = async (postID) => {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/getpost/${postID}`);
        const d = await response.json();
        console.log(d);
        setIndividualPost(d.post)    
    }

    const getAllPost = async ()=>{
        loading = true
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/getallpost`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        })
        const data = await response.json()
        setUserPosts(data)
        loading = false;
        return data
    }

    const createPost = async ({title, description})=> {
        loading = true;
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/createpost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({title, description})
        })

        console.log(await response.json())

        loading = false
        getAllPost()
    }

    const editPost = async (id, title, description)=> {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/editpost/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({title, description})
        })
        getAllPost()
     
    }

    const deletePost = async (id)=> {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/deletepost/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
        })
        getAllPost()
      
    }

    const allUserPosts = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/allposts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setAllPosts(data.posts)
      }

    useEffect(()=> {
        allUserPosts();
    }, [])

    return(
    <PostContext.Provider value={{individualPost, getPost, allUserPosts,allPosts, userPosts, loading ,createPost, getAllPost, editPost, deletePost}}>
            {props.children}
        </PostContext.Provider>

    )

}

export default PostState