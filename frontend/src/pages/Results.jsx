import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { delay, motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Results() {
  const [image, setImage] = useState(assets.sample_img);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const navigate=useNavigate()

  const { generateImage } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (input) {
      const image = await generateImage(input);
      if (image.success) {
        setIsImageLoaded(true);
        setImage(image.image);
      }
    }
    setLoading(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div className="relative">
      <ArrowLeft size={30} className="text-white absolute top-10 left-10" onClick={()=>navigate('../')}/>
        <div className="relative">
          <img src={image} alt="" className="max-w-sm rounded" />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-red-500 ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            }`}
          />
        </div>
        <p className={!loading ? "hidden" : ""}>Generating.....</p>
      </div>
      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-black text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe your idea, and our AI will generate it!"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder:color"
          />
          <button
            type="submit"
            className="bg-purple-700 cursor-pointer px-10 sm:px-16 py-3 rounded-full"
          >
            Generate
          </button>
        </div>
      )}
      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              setIsImageLoaded(false);
            }}
            className="bg-transparent border border-gray-700 text-white px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </p>
          <a
            href={image}
            download
            className="bg-yellow-900 px-10 py-3 rounded-full cursor-pointer"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
}

export default Results;
