import React, { createContext, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [credit, setCredit] = useState(null);
  const [isAuthenticated,setIsAuthenticated]=useState()
  const navigate = useNavigate();

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

      if (response.data.success) {
        setUser(response.data.data.user);
        setCredit(response.data.data.user.creditBalance);
        setIsAuthenticated(true)
        toast.success(response.data.message)
        return { success: true };
      }
    } catch (error) {
      console.error("Login failed: ", error.response?.data || error.message);

      return { success: false, message: error.response?.data?.message };
    }
  };

  const signUp = async (formData) => {
    try {
      const response = await axiosInstance.post("/users/signup", formData);

      if (response.data.success) {
        setUser(response.data.data.user);
        setIsAuthenticated(true)
        toast.success(response.data.message)
        return { success: true };
      }
    } catch (error) {
      console.error("Signup failed: ", error.response?.data || error.message);

      return { success: false, message: error.response?.data?.message };
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/users/logout");

      if (response.data.success) {
        setUser(null);
        setCredit(null);
        setIsAuthenticated(false)
      }

      return { success: true };
    } catch (error) {
      console.error("Logout failed: ", error.response?.data || error.message);

      return { success: false, message: error.response?.data?.message };
    }
  };

  const loadCredits = async () => {
    try {
      const response = await axiosInstance.get("/users/credits");

      if (response.data.success) {
        setCredit(response.data.data.credits);
        // toast.success(response.data.message)
      }

      return { success: true };
    } catch (error) {
      console.error(
        "Unable to load credits: ",
        error.response?.data || error.message
      );

      return { success: false, message: error.response?.data?.message };
    }
  };

  const generateImage = async (prompt) => {
    try {
      const response = await axiosInstance.post("/images/generate-image", {
        prompt,
      });
      if (response.data.success) {
        await loadCredits();
        return { success: true, image: response.data.data.resultImage };
      }
    } catch (error) {
      console.error(
        "Unable to Generate Image: ",
        error.response?.data || error.message
      );
      return { success: false, message: error.response?.data?.message };
    }
  };

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (data) => {
        try {
          const response = await axiosInstance.post(
            "/users/verify-razor",
            data
          );
          if (response.data.success) {
            await loadCredits();
            navigate("/");
            toast.success(response.data.message)
          }
        } catch (error) {
          console.error(error.response?.data || error.message);
          return { success: false, message: error.response?.data?.message };
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const razorpay = async (planId) => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }

      const response = await axiosInstance.post("/users/pay-razor", { planId });

      if (response.data.success) {
        await initPay(response.data.data);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        checkAuth,
        isAuthenticated,
        setUser,
        credit,
        setCredit,
        login,
        signUp,
        logout,
        loadCredits,
        generateImage,
        initPay,
        razorpay,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
