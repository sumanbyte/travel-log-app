import { useContext } from "react"
import authContext from "../context/authContext"

const useAuthentication = () => {
  const context = useContext(authContext);

  if(!context){
    throw new Error('Authentication Error');
  }

  return context
}

export default useAuthentication