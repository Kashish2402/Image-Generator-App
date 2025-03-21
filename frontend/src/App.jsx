import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Results from "./pages/Results";
import BuyCredit from "./pages/BuyCredit";
import Home from "./pages/Home";
import Footer from "./components/Footer"

function App() {

  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 xl:px-28 2xl:px-32 min-h-screen text-white bg-[#121212]">
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/result" element={<Results />}></Route>
          <Route path="/buy" element={<BuyCredit/>}></Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
