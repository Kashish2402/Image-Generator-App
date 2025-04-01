import { Download, Eye, WandSparkles } from "lucide-react";
import React from "react";
import { delay,motion } from "motion/react";

function Steps() {
  return (
    <motion.div className="w-full flex items-center justify-center flex-col gap-14"
    initial={{opacity:0.2,y:200}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-center border border-gray-400/50 w-fit px-16 py-3 rounded-4xl md:text-5xl text-3xl ">
          How AI Magic Works?
        </h1>
        <p className="mt-2  text-neutral-400 tracking-wide">
          Your Imagination, Visualized in Moments!
        </p>
      </div>

      <div className="w-[85%] md:w-3/4 lg:w-1/2 flex flex-col items-center gap-5">
        <div className="step w-full bg-black border border-gray-500/40 shadow-2xl p-3 md:px-10 px-4 rounded-xl cursor-pointer hover:scale-105 ">
          <div className="flex items-center gap-4 ">
            <div className="bg-gray-500/50 h-18 w-18 text-gray-300 rounded flex items-center justify-center"><Eye size={30}/></div>
            <div className="w-3/4">
              <h1 className="text-xl font-semibold text-white/80">Describe Your Vision</h1>
              <p className="text-sm tracking-tight text-white/60">Type a phrase, sentence, or paragraph that describes the image you want to create.</p>
            </div>
          </div>

          
        </div>

        <div className="step bg-black w-full border border-gray-500/40  p-3 md:px-10 px-4 rounded-xl cursor-pointer hover:scale-105 ">
          <div className="flex items-center gap-4 ">
            <div className="bg-gray-500/50 h-18 w-18 text-gray-300 rounded flex items-center justify-center"><WandSparkles size={30}/></div>
            <div className="w-3/4">
              <h1 className="text-xl font-semibold text-white/80">Watch the Magic</h1>
              <p className="text-sm tracking-tight text-white/60">Our AI engine swiftly transforms your text into a high-quality, unique image within seconds.</p>
            </div>
          </div>

          
        </div>

        <div className="step bg-black w-full border border-gray-500/40 shadow-2xl p-3 md:px-10 px-4 rounded-xl cursor-pointer hover:scale-105 ">
          <div className="flex items-center gap-4 ">
            <div className="bg-gray-500/50 h-18 w-18 text-gray-300 rounded flex items-center justify-center"><Download size={30}/></div>
            <div className="w-3/4">
              <h1 className="text-xl font-semibold text-white/80">Download & Share</h1>
              <p className="text-sm tracking-tight text-white/60">Instantly download your creation or share it directly from our platform. Let your imagination flow and watch it come to life effortlessly.</p>
            </div>
          </div>

          
        </div>
      </div>
    </motion.div>
  );
}

export default Steps;
