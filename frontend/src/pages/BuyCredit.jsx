import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { plans } from "../assets/assets";
import { delay, motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function BuyCredit() {
  const { user, razorpay } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <motion.div
        className="min-h-[80vh] text-center pt-14 mb-10"
        initial={{ opacity: 0.2, y: 200 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
          Our Subscription
        </button>
        <h1 className="text-center text-3xl font-bold mb-6 sm:mb-10">
          Choose the Subscription
        </h1>
        <div className="flex flex-wrap justify-center gap-6 text-left">
          {plans.map((item, index) => (
            <div
              key={index}
              className="bg-black drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
            >
              <p className="mt-3 mb-1 font-semibold">{item.id}</p>
              <p className="text-sm">{item.desc}</p>
              <p className="mt-6">
                <span className="text-3xl">₹{item.id}</span> / {item.credits}
              </p>
              <button
                className="w-full bg-blue-700 text-white mt-8 text-sm rounded-full py-2.5 min-w-52 cursor-pointer"
                onClick={() => razorpay(item.id)}
              >
                Purchase
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default BuyCredit;
