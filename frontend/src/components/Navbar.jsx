import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const { user } = useContext(AppContext);
  const navigate=useNavigate()

  console.log(user)
  const handleSubsription=()=>{

  }
 
  return (
    <div className="flex items-center justify-between py-5">
      <div className="font-[Lobster] text-2xl  font-bold">
        <Link to="/" className="text-[2.5rem]">
          <span className=" text-[#dfe8e6]">ima</span>

          <span className="text-purple-700 italic">Zen</span>
        </Link>
      </div>

      {!user ? (
        <div className="flex items-center gap-5">
          <button className="bg-purple-700 px-3 py-1 rounded-3xl cursor-pointer hover:bg-purple-900 transition-colors ease-out duration-150" onClick={handleSubsription}>
            Subscription
          </button>

          <button className="bg-black px-3 py-1 rounded-3xl cursor-pointer" onClick={()=>navigate('/login')}>
            Login
          </button>
        </div>
      ) : (
        <div className="">
          <div className="text-white flex items-center space-x-4">
            <button className="flex items-center justify-center gap-1 bg-black px-3 py-1 rounded-2xl">
              <Star size={16} />
              <p className="text-white/80">Credits left : 5</p>
            </button>
            <p>Hi , {user}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
