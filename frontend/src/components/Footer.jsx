import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="h-[10vh] flex items-center justify-between border-t border-gray-600/50">
      <div className="flex items-center gap-5 divide-x divide-gray-500">
        <div className="font-[Lobster] text-xl  font-bold pr-3">
          <Link to="/" className="text-[2rem]">
            <span className=" text-[#dfe8e6]">ima</span>

            <span className="text-purple-700 italic">Zen</span>
          </Link>

        </div>
        <p className="text-xs text-neutral-400  md:text-md">Copyright 2025 @ AiCodinghub - All Right Reserved.</p>
      </div>

    <div className="flex flex-wrap gap-3 items-center">
      <p className="text-sm text-neutral-400 ">Follow us on social media: </p>
      <div className="flex items-center gap-2">
        <p className="w-fit bg-blue-700 rounded-full p-1 cursor-pointer"><Facebook size={22}/></p>
        <p className="w-fit bg-pink-700 rounded-full p-1 cursor-pointer"><Instagram size={22}/></p>
        <p className="w-fit bg-black rounded-full p-1 cursor-pointer"><Twitter size={22}/></p>
        
      </div>
    </div>
    </div>
  );
}

export default Footer;
