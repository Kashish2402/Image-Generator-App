import React, { createContext, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [credit, setCredit] = useState(null);
  // const navigate = useNavigate();

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
        setCredit(null);
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
      const response = await axiosInstance.get("/users/credits");

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
          const response = await axiosInstance.post("/verify-razor", data);
          if (response.data.success) {
            await loadCredits();
            navigate("/");
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

  const razorpay = async (plan) => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }

      const response = await axiosInstance.post("/pay-razor", { plan });

      if (response.data.success) {
        await initPay(response.data.order);
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
