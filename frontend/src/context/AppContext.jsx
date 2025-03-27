import React, { createContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [credit, setCredit] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const login = async (formData) => {
    try {
      const response = await axios.post(
        `${backendUrl}/users/login`,
        formData,
        { withCredentials: true }
      );

      console.log(response.data)

      if(response.data.data){
        setUser(response.data.data);
        setCredit(response.data.data.creditBalance);
      }
    } catch (error) {
        console.log(error)
      console.error("Login failed: ", error.response?.data || error.message);
    }
  };

  return (
    <AppContext.Provider value={{ user, setUser, credit, setCredit, login }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
