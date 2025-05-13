import React, { useState } from "react";
import { useContext, createContext } from "react";

const UserDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    isVerified: false,
    data: {},
    profilePicture: ""
  });
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
