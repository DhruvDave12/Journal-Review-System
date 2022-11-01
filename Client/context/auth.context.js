import {useEffect, useState, createContext} from 'react';
import axiosInstance from '../services/axiosInstance';

export const AuthContext = createContext ();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState (null);
  const [accessToken, setAccessToken] = useState ({});
  const [isLoggedIn, setIsLoggedIn] = useState (false);
  const [loading, setLoading] = useState(false);

  useEffect (() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get ('/user/details');
        localStorage.setItem("role", res?.data?.user?.role);
        setUser (res.data);
      } catch (err) {
        console.log (err);
      }
      setLoading(false);
    };
    getUser ();
  }, []);

  useEffect (
    () => {
      if (Object.keys (accessToken).length > 0) {
        setIsLoggedIn (true);
      } else {
        setIsLoggedIn (false);
      }
    },
    [accessToken]
  );


  return (
    <AuthContext.Provider
      value={{user, accessToken, setAccessToken, isLoggedIn, loading}}
    >
      {children}
    </AuthContext.Provider>
  );
};
