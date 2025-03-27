import React, { createContext, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../lib/axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [credit, setCredit] = useState(null);
  const [showError, setShowError] = useState("");

  const login = async (formData) => {
    try {
      const response = await axiosInstance.post("/users/login", formData);
      console.log(response.data);

      if (response.data.success) {
        setUser(response.data.data.user);
        setCredit(response.data.data.user.creditBalance);
        return { success: true };
      }
    } catch (error) {
      console.log(error);
      setShowError(error.response?.data?.message);
      console.error("Login failed: ", error.response?.data || error.message);

      return { success: false, message: error.response?.data?.message };
    }
  };

  const signUp = async (formData) => {
    try {
      const response = await axiosInstance.post("/users/signup", formData);

      if (response.data.success) {
        setUser(response.data.data.user);
        return { success: true };
      }
    } catch (error) {
      console.log(error);
      setShowError(error.response?.data?.message);
      console.error("Signup failed: ", error.response?.data || error.message);

      return { success: false, message: error.response?.data?.message };
    }
  };

  return (
    <AppContext.Provider
      value={{ user, setUser, credit, setCredit, login, signUp, showError }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
