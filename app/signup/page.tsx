"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#1a232f] relative text-white">
      {/* Gradient Background */}
     
      <div className="gradient-02" />
      <div className="gradient-03" />

      <div className="glassmorphism p-8 rounded-lg shadow-lg max-w-md w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center">{loading ? "Processing..." : "Signup"}</h1>
        <hr className="mb-6 border-gray-600" />

        <label htmlFor="username" className="block mb-2 font-medium">
          Username
        </label>
        <input
          className="p-2 w-full border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter your username"
        />

        <label htmlFor="email" className="block mb-2 font-medium">
          Email
        </label>
        <input
          className="p-2 w-full border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />

        <label htmlFor="password" className="block mb-2 font-medium">
          Password
        </label>
        <input
          className="p-2 w-full border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />

        <button
          onClick={onSignup}
          className={`p-2 w-full rounded-lg mb-4 ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-colors duration-300`}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Enter all fields" : "Signup"}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
