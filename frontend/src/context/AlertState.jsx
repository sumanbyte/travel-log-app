import AlertContext from "./alertContext";
import { useState } from 'react';


const AlertState = ({children}) => {
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState(null);
    return (
        <AlertContext.Provider value={{show,setShow, alert, setAlert}}>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertState;