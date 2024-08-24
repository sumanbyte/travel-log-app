import PostContext from "./postContext";
import { useState } from "react";
const PostState = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userPosts, setUserPosts] = useState(null);
    const [allPosts, setAllPosts] = useState(null)
    const [individualPost, setIndividualPost] = useState(null);

    const getPost = async (postID) => {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/getpost/${postID}`);
        const d = await response.json();
        console.log(d);
        setIndividualPost(d.post)
    }

    const getAllPost = async () => {
        try{
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/getallpost`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            })
            const data = await response.json()
            setUserPosts(data)
            return data;
        }catch(e){
            setError("Failed to fetch.")
        }finally{
            setLoading(false);
        }
    }

    const createPost = async ({ title, description, map }) => {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/createpost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ title, description, map })
        })

        console.log(await response.json())

        setLoading(false)
        getAllPost()
    }

    const editPost = async (id, title, description, map) => {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/editpost/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ title, description, map })
        })
        getAllPost()

    }

    const deletePost = async (id) => {
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
        try {

            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/allposts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setAllPosts(data.posts)
        } catch (e) {
            setError("Failed to fetch.")
        }finally{
            setLoading(false);
        }
    }

    

    return (
        <PostContext.Provider value={{ individualPost, getPost, allUserPosts, allPosts, userPosts, loading, createPost, getAllPost, editPost, deletePost, error }}>
            {props.children}
        </PostContext.Provider>

    )

}

export default PostState