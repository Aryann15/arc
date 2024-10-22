import { FaUserCircle } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">

      <header className="absolute top-0 w-full flex justify-between items-center p-6 bg-black">
        <h1 className="text-white text-2xl font-bold">ARC</h1>
        <FaUserCircle className="text-white" size={30} />
      </header>

      <main className="text-center">
        <h2 className="text-4xl font-bold mb-4">Take control of your finances</h2>
        <p className="text-gray-500 text-lg mb-8">
          ARC is the all-in-one expense tracking solution to help you manage your money with ease.
        </p>

        <div className="space-x-4">
          <button className="bg-black text-white py-2 px-6 rounded-lg font-bold hover:bg-gray-800">
            Get Started
          </button>
          <button className="bg-gray-200 text-black py-2 px-6 rounded-lg font-bold hover:bg-gray-300">
            Learn More
          </button>
        </div>
      </main>
    </div>
  );
}
