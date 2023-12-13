import React from 'react'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {auth} from './firebase.js'
import Welcome from './Welcome.js'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {useStateValue} from './StateProvider.js'
import Axios from "axios"
function Login() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [{user},dispatch]=useStateValue();
    const [error,setError]=useState(false);
    const [errorMessage,setErrorMessage]=useState("");
    const [a,setA]=useState("");
    let Navigate=useNavigate();
    const signIn = e =>{
        e.preventDefault();
        console.log("hi")
        
          signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
          // Signed in 
          // console.log("signed in user successfully")
          // console.log(user.uid)
         
              Navigate('/welcome')
        
          // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(true);
      setErrorMessage(errorMessage);
    });
        }
        
        
    
    const register = e =>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("created account")
      Axios
        .post('http://localhost:3001/insertUser',{uid:user.uid,email:user.email})
        .then((response) => {
          console.log(response.data);
          console.log("done");
          // Handle the response here if needed
        })
        .catch((error) => {
          
          // setErrorMessage("....");
          console.error(error);
          // setErrorMessage("....");
          // console.log(errorMessage);
          // Handle errors here if needed
        });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("unable to create account",errorMessage)
      // ..
    });
       
}
  return (
    <div className="Login" class="flex flex-col items-center justify-center min-h-screen bg-gray-100" >
      
    <p class="text-xs text-blue-600 dark:text-white">Please sign in...&nbsp;<span class="italic">New User?&nbsp;</span>Create Account</p>
    <form className="flex max-w-md flex-col gap-4 w-full">
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email1"
            value="Email"
          />
        </div>
        <TextInput
          id="email1"
          placeholder="name@flowbite.com"
          required
          type="email"
          value={email}
          onChange = {e => setEmail(e.target.value)}
          
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password1"
            value="Password"
          />
        </div>
        <TextInput
          id="password1"
          required
          type="password"
          value={password}
          onChange = {e => setPassword(e.target.value)} 
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">
          Remember me
        </Label>
      </div>
      {error&&<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span class="font-medium">{errorMessage}</span>
        </div>}
      <Button type="submit" onClick={signIn}>
        Sign-In
      </Button>
      <Button className="register" onClick={register}>
        Create Account
      </Button>
    </form>
    </div>
  )
}

export default Login;
