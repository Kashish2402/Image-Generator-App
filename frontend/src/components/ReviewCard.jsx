import React from "react";
import { assets } from "../assets/assets";

function ReviewCard({ imageUrl, name, position, stars = 3, comment }) {
  return (
    <div className="bg-black w-[300px] p-4 flex flex-col items-center rounded-xl gap-3 hover:scale-105 step">
      <div>
        <img src={assets.people1} alt="" className="h-20 w-20 rounded-full" />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-white font-semibold">Arjun</h2>
        <p className="text-gray-400">Designer</p>
      </div>

      <div>
        <div className="flex items-center">
          {[...Array(stars)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg">
              ⭐
            </span>
          ))}
        </div>
      </div>

      <div className="w-full text-justify text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
        voluptatum expedita sequi cupiditate voluptatibus voluptas dignissimos
        molestiae omnis? Consequuntur eius ea quam sapiente laboriosam pariatur,
        unde incidunt nemo sed cum.
      </div>
    </div>
  );
}

export default ReviewCard;
