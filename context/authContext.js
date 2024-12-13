import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      setIsAuthenticated(false);
    }, 3000);
  }, []);
  console.log(isAuthenticated, "auth");
  const login = (email, password) => {
    try {
    } catch (error) {}
  };

  const logOut = () => {
    try {
    } catch (error) {}
  };

  const signUp = (username, email, password) => {
    try {
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, logOut, login, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
