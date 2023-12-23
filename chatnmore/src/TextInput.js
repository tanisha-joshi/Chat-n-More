import React from 'react'

function TextInput() {
  return (
    <div className="bg-white w-full h-screen">
        <div className="border w-96 h-96 rounded-2xl ml-20 mt-20 pt-16">
            <input type="text" className="border-none focus:outline-none rounded-lg h-56 w-80 bg-slate-100 pl-3 pr-3 pt-3 pb-3 overflow-scroll text-lg font-bold text-slate-500" placeholder="what's happening?"></input>
            <button className="bg-blue-500 hover:bg-blue-700 w-28 text-white font-bold text-lg py-3 px-4 rounded-lg mt-5 ml-52" > Post </button>
        </div>
    </div>
  )
}

export default TextInput