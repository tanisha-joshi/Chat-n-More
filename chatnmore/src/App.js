import './App.css';
import Login from './Login.js'
import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Welcome from './Welcome.js'
import {useStateValue} from './StateProvider.js'
import {useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js"
import FileUpload from './FileUpload.js'
function App() {
  const [{user},dispatch]=useStateValue();
  useEffect(() =>{
    onAuthStateChanged(auth, (user) => {
      console.log("The user is from app.js",user)
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    dispatch({
      type: 'SET_USER',
      user: user,
    })
    const uid = user.uid;
    // ...
    } else {
    // User is signed out
    // ...
    dispatch({
      type: 'SET_USER',
      user: user,
    }) 
  }
});

  },[])
  return (
      <Router>
        <div className="App">
        <Routes>
          <Route path="/" element = {<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/FileUpload" element={<FileUpload />} />
        </Routes>
        </div>
      </Router>
  );
}

export default App;
