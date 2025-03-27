import React, { useContext, useState } from "react";
import Password from "../components/Password";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion, delay } from "motion/react";
import { Mail, UserRound } from "lucide-react";
import { AppContext } from "../context/AppContext";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate=useNavigate()

  const [error, setError] = useState();

  const { signUp } = useContext(AppContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    const check = await signUp(formData);

    if (!check.success) {
      setError(check.message);
      return;
    }
    
    navigate('/')
    setFormData({ fullName: "", email: "", password: "" });
  };

  return (
    <motion.div
      className="h-screen w-full flex items-center justify-center"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="border border-gray-500 step px-2 py-10 rounded-2xl bg-gray-900/30 w-[450px] flex flex-col items-center gap-5">
        <h1 className="text-3xl font-semibold">Create Account</h1>

        <motion.form
          onSubmit={handleSignUp}
          className="w-3/4 flex flex-col gap-8 items-center"
          initial={{ opacity: 0.2, x: 50, y: 50 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full flex flex-col gap-6">
            <div className="w-full flex bg-gray-700/20 items-center px-2 rounded-lg">
              <UserRound size={20} className="text-white/50" />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className=" rounded-lg p-2 outline-none w-full px-3"
                placeholder="fullName"
              />
            </div>

            <div className="w-full flex bg-gray-700/20 items-center px-2 rounded-lg">
              <Mail size={20} className="text-white/50" />
              <input
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="rounded-lg p-2 outline-none w-full px-3"
                placeholder="email"
              />
            </div>

            <Password
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            {<p className="text-red-700 text-center">{error && error}</p>}
          </div>

          <button
            type="submit"
            className="bg-purple-700 w-full py-2 rounded-2xl cursor-pointer hover:bg-purple-800 transition-all ease-out duration-200"
          >
            Create Account
          </button>

          <p className="text-sm text-white/80">
            Don&apos;t have an account?{" "}
            <Link
              className="text-blue-700 hover:underline font-medium"
              to="/login"
            >
              SignIn
            </Link>
          </p>
        </motion.form>
      </div>
    </motion.div>
  );
}

export default SignUp;
