import { ArrowRight } from "lucide-react";
import React, { useContext } from "react";
import { delay, motion } from "motion/react";
import { assets } from "../assets/assets";
import {AppContext} from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const {user}=useContext(AppContext)

  const navigate = useNavigate();



  const handleClick = () => {
    if (user) {
      navigate("/result");
    } else {
      navigate("/login")
    }
  };
  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20"
      initial={{ opacity: 0.2, y: 300 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="inline-flex text-center gap-2 px-6 py-1 rounded-full border md:hover:scale-105 border-neutral-500 transition-all duration-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ delay: 0.2, duration: 0.8 }}
      >
        <p className="text-white text-nowrap">
          "Turn Imagination into Images – Instantly!" 💫
        </p>
      </motion.div>

      <motion.h1
        className="text-4xl max-w-[300px] sm:text-6xl sm:max-w-[590px] mx-auto mt-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
      >
        Create <span className="text-purple-600 font-bold">Stunning Art</span>{" "}
        from Words in Seconds!
      </motion.h1>

      <motion.p
        className="italic max-w-[400px] md:max-w-[600px] text-gray-300/60 tracking-tight mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        "Unleash limitless creativity with AI—transform your thoughts into
        breathtaking art in an instant. Just type and let the magic happen!"
      </motion.p>

      <motion.button
        className="flex items-center justify-center
      gap-2 bg-purple-700 px-6 py-3 rounded-3xl text-xl mt-6 cursor-pointer border border-transparent hover:border-purple-700 hover:bg-transparent transition-colors duration-200 ease-out delay-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { duration: 0.5 },
          opacity: { delay: 0.8, duration: 1 },
        }}
        onClick={handleClick}
      >
        Generate Now <ArrowRight />
      </motion.button>

      <motion.div className="flex flex-wrap justify-center mt-16 gap-3">
        {Array(6)
          .fill("")
          .map((item, index) => (
            <motion.img
              whileHover={{ scale: 1.05, duration: 0.1 }}
              src={index % 2 === 0 ? assets.Pic1 : assets.Pic2}
              alt=""
              width={60}
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
              key={index}
            />
          ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-2 text-neutral-600"
      >
        Our Generated Images
      </motion.p>
    </motion.div>
  );
}

export default Header;
