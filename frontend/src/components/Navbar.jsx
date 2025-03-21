import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <div className="font-[Lobster] text-2xl  font-bold">
        <Link to="/" className="text-[2.5rem]">
          <span className=" text-[#dfe8e6]">ima</span>

          <span className="text-purple-700 italic">Zen</span>
        </Link>
      </div>

      <div className="">
        <div className="text-white flex items-center space-x-4">
          <button className="flex items-center justify-center gap-1">
            <Star size={16} />
            <p>Credits left : 5</p>
          </button>
          <p>Hi , User</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
