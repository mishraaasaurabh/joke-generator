import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

function App() {
  const [joke, setJoke] = useState("")

  const generateJoke = () => {
    axios.get(import.meta.env.VITE_DOMAIN_NAME)
      .then(({ data }) => {
        setJoke(data.joke);
      })
  }

  useEffect(() => {
    generateJoke();
  }, [])

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#334155] text-white">
      <div className="bg-[#1e293b] rounded-2xl p-8 shadow-lg max-w-md w-full text-center border border-gray-700">
        {/* Fixed Heading */}
        <h1
          className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-lg tracking-wide"
          style={{ height: "64px", lineHeight: "64px" }}
        >
          Comedy Click
        </h1>
        {/* Joke Text */}
        <p
          className="text-base mb-6 leading-relaxed font-medium text-gray-300"
          style={{ minHeight: "80px" }}
        >
          {joke || "Feeling down? Click the button below to brighten your day with a joke!"}
        </p>
        {/* Fixed Button */}
        <button
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          style={{ height: "48px" }}
          onClick={generateJoke}
        >
          🎉 Get a Joke
        </button>
      </div>
    </div>
  )
}

export default App
