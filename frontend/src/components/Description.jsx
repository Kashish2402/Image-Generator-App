import React from "react";
import { assets } from "../assets/assets";
import { delay, motion } from "motion/react";

function Description() {
  return (
    <motion.div className="flex flex-col items-center justify-center mt-15 gap-10"
    initial={{opacity:0.2,y:200}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    >
      <div className="flex flex-col items-center gap-2">
        <h1 className="md:text-3xl text-xl text-white/70">
          Generate AI Images
        </h1>
        <p className="text-neutral-400">Bring creativity to your life.</p>
      </div>

      <div className="w-[90%] mx-auto md:w-3/4 flex items-center justify-between gap-5">
        <div className="w-1/2">
          <img src={assets.sample_img} alt="" className="w-80 xl:w-96"/>
        </div>
        <div className="w-3/4 flex flex-col items-center justify-between gap-3">
          <h1 className="font-bold text-white/90 text-2xl">
            AI Website: Your Go-To Text-to-Image Generator for Instant
            Creativity
          </h1>

          <p className="text-neutral-400 text-md tracking-tight italic">
            "Every idea deserves a masterpiece. Describe your vision, and our AI
            will craft stunning visuals in moments. No tools, no skills—just
            pure creativity unleashed!" Would you like a specific tone—more
            playful, professional, or futuristic?{" "}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Description;
