import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user information

  const login = (userInfo) => {
    // Perform login logic and set user information
    setUser(userInfo);
  };

  const logout = () => {
    // Perform logout logic and clear user information
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};