import React, { createContext, useState } from "react";
import { useContext } from "react";

const AuthContext = createContext();

const AuthContextProvider =({children})=>
{

    let isUserLoggiedIn = sessionStorage.getItem("userToken") ? true : false;
    let[isLoggedIn, setIsLoggedIn] = useState(isUserLoggiedIn);
    return (<AuthContext.Provider value={{isLoggedIn,setIsLoggedIn}}>{children}</AuthContext.Provider>)

}

export default AuthContextProvider;

export const useAuth=()=>
{
    return useContext(AuthContext);
}