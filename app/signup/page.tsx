import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';

export default function SignUp() {
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

          <input
            type="email"
            placeholder="Enter your Name"
            className="mb-4 p-3 rounded-lg bg-white w-full border border-gray-300 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Enter your Password"
            className="mb-4 p-3 rounded-lg bg-white w-full border border-gray-300 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Enter your Email"
            className="mb-4 p-3 rounded-lg bg-white w-full border border-gray-300 focus:outline-none"
          />
          <button className="bg-black text-white py-2 px-4 rounded-lg w-full font-bold hover:bg-gray-800">
            Sign up
          </button>
        </div>

       
      </div>
    </div>
  );
}
