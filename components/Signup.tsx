"use client"
import axios from "axios";
import { ChangeEventHandler, useState } from "react";
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center h-screen bg-gray-400">
      <div className="bg-white shadow-lg rounded-lg flex w-3/4 max-w-4xl ">
        <div className="w-1/2 p-8 flex flex-col justify-center bg-black text-white rounded-r-lg">
          <h2 className="text-3xl font-bold mb-8">Welcome Back!</h2>
          <p className="mb-6 text-gray-300">
            Enter your personal details to start your finance journey with us!
          </p>
          <button className="bg-white text-black py-2 px-4 rounded-lg font-bold hover:bg-gray-200">
            Sign in
          </button>
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center bg-gray-200 rounded-l-lg">
          <h2 className="text-3xl font-bold mb-8">Create Account</h2>

          <div className="flex justify-around mb-6">
            <button className="text-2xl">
              <FaGoogle />
            </button>
            <button className="text-2xl">
              <FaApple />
            </button>
            <button className="text-2xl">
              <FaFacebook />
            </button>
          </div>

          <div className="pt-2"> <LabelledInput onChange={(e) => {
                setUsername(e.target.value);
              }}
              label="Username" placeholder="aryan@gmail.com"
            />
            <LabelledInput onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="Password" type={"password"} placeholder="123456"
            />
            <button
              type="button" onClick={()=>{
                axios.post("http://localhost:3000/api/user",{
                    username,
                    password
                })
              }} className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelledInput({ label, placeholder, type, onChange,}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
