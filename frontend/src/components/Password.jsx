import { Eye, EyeClosedIcon, EyeOff, Lock } from "lucide-react";
import React, { useState } from "react";

function Password({ value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full relative flex items-center bg-gray-700/20 rounded-lg px-2">
      <Lock size={20} className="text-white/50" />
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className=" p-2 outline-none w-full px-3"
        placeholder="password.."
      />

      <button
        type="button"
        className="absolute right-2 top-2 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <Eye /> : <EyeOff />}
      </button>
    </div>
  );
}

export default Password;
