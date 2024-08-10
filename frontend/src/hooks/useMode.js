import { useContext } from "react";
import modeContext  from "../context/modeContext";


export default function useMode(){
    const context = useContext(modeContext);

    if(!context){
        throw new Error("Some error occured.")
    }

    return context;
}