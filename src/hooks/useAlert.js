import { useContext } from "react";
import alertContext from "../context/alertContext";

const useAlert = ()=> {
    const context = useContext(alertContext)
    if(!context){
        throw new Error('context is not available')
    }
    return context;
}

export default useAlert