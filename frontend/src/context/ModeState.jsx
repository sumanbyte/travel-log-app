import { useState } from "react";
import ModeState from "./modeContext";

export default function ModeStateProvider({children}){
    const [darkMode, setDarkMode] = useState(()=> {
        return JSON.parse(localStorage.getItem("darkMode")) || false;
    });

    return <ModeState.Provider value={{darkMode, setDarkMode}}>
        {children}
    </ModeState.Provider>
}