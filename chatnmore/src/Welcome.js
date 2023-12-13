import React from 'react'
import { Button } from 'flowbite-react';
import {useNavigate} from 'react-router-dom'
import Home from './Home.js'
import Navbar from './Navbar.js'
function Welcome() {
  const Navigate=useNavigate();
  const renderUser=()=>{
    Navigate('/FileUpload')
  }
  return (
    <div className="welcome" >
        <Navbar renderUser={renderUser}/>
        <br></br>
        <p class="text-2xl text-gray-900 font-extralight dark:text-white">Your Feed</p>

        <br />
        <Home />
    </div>

  )
}

export default Welcome