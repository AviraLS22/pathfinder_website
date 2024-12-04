"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="relative bg-[#1a232f] flex items-center justify-center min-h-screen bg-gradient-to-r from-[#3e0360] to-[#34acc7]">
      {/* Gradients */}
      <div className="gradient-02"></div>
      <div className="gradient-03"></div>
      <div className="gradient-04"></div>

      {/* Login Card */}
      <div className="glassmorphism w-[70%] max-w-md p-8 rounded-lg shadow-md flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-white mb-6">
          {loading ? "Processing..." : "Login"}
        </h1>
        <hr className="w-full border-t-[1px] border-gray-300 mb-6" />

        {/* Email Input */}
        <label htmlFor="email" className="text-white text-sm mb-2 self-start">
          Email
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />

        {/* Password Input */}
        <label htmlFor="password" className="text-white text-sm mb-2 self-start">
          Password
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />

        {/* Login Button */}
        <button
          onClick={onLogin}
          disabled={buttonDisabled}
          className={`w-full p-3 rounded-lg text-white mb-4 ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#3e0360] hover:bg-[#34acc7] transition-all"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Link to Signup Page */}
        <p className="text-white text-sm mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-[#34acc7] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
