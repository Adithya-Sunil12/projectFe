import { createContext, useState } from "react";
//create a context,the state will be stored and will be manged thru AuthContext--this will be provied to the whole applicaton
export const AuthContext = createContext();

//we will wrap the app with context provider so the app will be inside the provider here children means the app
export const AuthProvider = ({ children }) => {
  //save token,get token, remove token

  //authprvider ullile childernil aanu authprovider povendath

  const [token, setToken] = useState(localStorage.getItem("token"));

  //AuthContext.token===we will get token
  //now call save token
  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };
  const removeToken = () => {
    setToken(null);
    localStorage.clear();
  };

  return <AuthContext.Provider value={{token,saveToken,removeToken}}>
    {children}</AuthContext.Provider>;
};
//to acces token everywhere we use context