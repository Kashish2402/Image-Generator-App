import React from "react";
import { useNavigate } from "react-router-dom";
import { delay, motion } from "motion/react";

function GenerateBtn() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="w-full h-[45vh] flex flex-col items-center justify-center gap-4"
      initial={{ opacity: 0.2, y: 200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className="text-2xl font-semibold">See the magic. Try Now</h1>
      <button
        className="bg-purple-700 p-3  rounded-3xl px-5 hover:scale-105 cursor-pointer"
        onClick={() => navigate("/buy")}
      >
        Subscription✨
      </button>
    </motion.div>
  );
}

export default GenerateBtn;
