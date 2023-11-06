import React from 'react'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {auth} from './firebase.js'
import Welcome from './Welcome.js'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {useStateValue} from './StateProvider.js'
function Login() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [{user},dispatch]=useStateValue();
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
    });
        }
        
        
    
    const register = e =>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
       
}
  return (
    <div className="Login">
    <form className="flex max-w-md flex-col gap-4">
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
