import { useContext } from "react";
import postContext from "../context/postContext";

const usePost = ()=> {
    const context = useContext(postContext);
    // console.log(context);

    if(!context){
        throw new Error('Context Error')
    }

    return context;
}

export default usePost;