import React, { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'

const useAuth = () => {
    const {user,token,login,logout}=useContext(AuthContext);
  return (
    {
        user,token,login,logout,
    }
  );
}

export default useAuth