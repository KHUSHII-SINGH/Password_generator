import React, { useCallback, useEffect, useState,useRef} from 'react'
import image1 from "./Assets/image1.jpg"
import { motion } from "framer-motion";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //use Ref..
  const passwordRef=useRef(null)

  const passwordgenerator = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";

    if (charAllowed) str += "!@#$%^&*()_{}[]'";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copypasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    //passwordRef.current?.setSelectionRange(0,3)....y ek range me selection krwaega.
    window.navigator.clipboard.writeText(password)
  },
  [password])

  useEffect (()=>{
    passwordgenerator()
  },[length,numberAllowed,charAllowed,passwordgenerator])

  return (
    <div>
      <img
  src={image1}
  alt="Image"
  className="w-64 h-64 object-cover mx-auto"
/>

<motion.h2
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity:1 }}
  transition={{ duration: 1 }}
  className="text-3xl font-bold text-center my-6"
>
  Generate the Password here in one click....
</motion.h2>
    
    
    <div className="w-full max-w-
    xl mx-auto shadow-md rounded-xl px-6 py-20 my-8 bg-gray-700">
      <h1 className="text-white text-center text-2xl font-bold mb-6">
        Password Generator
      </h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-6 bg-white">
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          className="w-full px-3 py-3 outline-none text-black"
          ref={passwordRef}
        />

        <button
          onClick={copypasswordToClipboard}
          className="bg-blue-400 text-white px-4 py-3 flex-none hover:bg-blue-800"
        >
          Copy
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-white">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />

          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />

          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />

          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
