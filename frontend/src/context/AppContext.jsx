import React, { createContext, useState } from "react";
import { axiosInstance } from "../lib/axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [credit, setCredit] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get("/users/check-auth");
      if (response.data.data) {
        setUser(response.data.data);
        return { success: true };
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      console.error(
        "Unable to fetch Cuurent user !! Error :::",
        error.response?.data || error.message
      );
      return { success: false };
    }
  };

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
      console.error("Signup failed: ", error.response?.data || error.message);

      return { success: false, message: error.response?.data?.message };
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/users/logout");

      if (response.data.success) {
        setUser(null);
        setCredit(null)
      }

      return { success: true };
    } catch (error) {
      console.log(error);
      console.error("Logout failed: ", error.response?.data || error.message);

      return { success: false, message: error.response?.data?.message };
    }
  };

  const loadCredits = async () => {
    try {
      const response = await axiosInstance.get("//users/credits");

      if (response.data.success) {
        setCredit(response.data.data.credits);
      }

      return { success: true };
    } catch (error) {
      console.log(error);
      console.error(
        "Unable to load credits: ",
        error.response?.data || error.message
      );

      return { success: false, message: error.response?.data?.message };
    }
  };

  const generateImage = async (prompt) => {
    try {
      const response = await axiosInstance.post("/generate-image", { prompt });
      if (response.data.success) {
        loadCredits();
        return { success: true, image: response.data.data.resultImage };
      }
    } catch (error) {
      console.log(error);
      console.error(
        "Unable to load credits: ",
        error.response?.data || error.message
      );
      return { success: false, message: error.response?.data?.message };
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        checkAuth,
        setUser,
        credit,
        setCredit,
        login,
        signUp,
        logout,
        loadCredits,
        generateImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
