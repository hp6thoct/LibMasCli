// UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
    setCart(null);
  };

  const saveCart = (data) => {
    setCart(data);
  };

  return (
    <UserContext.Provider
      value={{ user, cart, loginUser, logoutUser, saveCart }}
    >
      {children}
    </UserContext.Provider>
  );
};
