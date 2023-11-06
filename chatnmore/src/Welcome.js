import React from 'react'
import { Button } from 'flowbite-react';
import {useNavigate} from 'react-router-dom'
import Home from './Home.js'
function Welcome() {
  const Navigate=useNavigate();
  const renderUser=()=>{
    Navigate('/FileUpload')
  }
  return (
    <div className="welcome">
        <h1>Welcome</h1>
        <Button onClick={renderUser}>User</Button>
        <br></br>
        <h1>Feed</h1>
        <br />
        <Home />
    </div>

  )
}

export default Welcome