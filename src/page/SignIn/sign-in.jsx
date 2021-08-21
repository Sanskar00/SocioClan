//libraries
import React, { useState } from "react";
import { auth } from "../../firebase/firebase";

//fireabase

const SignIn = () => {
    const [userCredentials,setUserCredentials]=useState({
        email:'',
        password:''
    })
    const {email,password}=userCredentials;
    const handleChange=(event)=>{
        const {name,value}=event.target;
        setUserCredentials({...userCredentials,[name]:value})
    }
    const login= async (event)=>{
        event.preventDefault();
        const {user}= await auth.signInWithEmailAndPassword(email,password);//for signing with email and password
        console.log(user)

    }
  return (
    <div>
      <form onSubmit={login}>
        <label htmlFor="email">email</label>
        <input type="text" placeholder="email" name="email" onChange={handleChange}/>
        <label htmlFor="password">password</label>
        <input type="password" placeholder="password" name="password" onChange={handleChange}/>
        <button>log in</button>
      </form>
    </div>
  );
};
export default SignIn;
