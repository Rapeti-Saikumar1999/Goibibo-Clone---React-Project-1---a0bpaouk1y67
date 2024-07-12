import React from 'react'
import { useAuth } from './useAuth'
import { Navigate, useLocation } from 'react-router-dom';
function AuthNavigator({children}) {
    const {isLoggedIn} = useAuth();
    const {pathName} = useLocation()
  return isLoggedIn ? children : <Navigate to="/login" state={{prevPath:pathName}}/>
}

export default AuthNavigator
