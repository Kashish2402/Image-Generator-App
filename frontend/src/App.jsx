import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Results from "./pages/Results";
import BuyCredit from "./pages/BuyCredit";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AppContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { user, checkAuth } = useContext(AppContext);
  useEffect(() => {
    checkAuth();
  }, [user,checkAuth]);
  
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 xl:px-28 2xl:px-32 min-h-screen text-white bg-[#121212]">
    
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/result" element={user?<Results />:<Login/>}></Route>
          <Route path="/buy" element={<BuyCredit />}></Route>
          <Route path="/login" element={!user &&<Login />}></Route>
          <Route path="/signUp" element={!user && <SignUp />}></Route>
        </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
