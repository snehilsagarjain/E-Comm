import React, { useState } from 'react'

const useMode = () => {
  const [mode, setMode] = useState(true);
  const changemode = () => {
    setMode(!mode);
  }
  return [mode, changemode];
}


const Custom_hook = () => {
  const [mode, changemode] = useMode();
  return (
    // <div style={{ backgroundColor: mode ? "black" : "white", }}>
    //   <button onClick={changemode}>
    //     {mode ? "Dark Mode" : "Light Mode"}
    //   </button>

    // </div>
    <h1 class="text-3xl text-red-500 font-bold underline">
      Hello world!
    </h1>
  )
}

export default Custom_hook