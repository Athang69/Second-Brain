import { useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){
  const usernameRef= useRef <HTMLInputElement>();
  const passwordRef= useRef <HTMLInputElement> ();
  const emailRef= useRef <HTMLInputElement> ();
  const navigate=useNavigate();
  async function signup(){
    const userName=usernameRef.current?.value;
    const password=passwordRef.current?.value;
    const email=emailRef.current?.value;
    await axios.post(BACKEND_URL + "/api/v1/signup",{
        userName,
        password,
        email
      
    })
    alert("You have successfully signed up!!")
    navigate("/signin")
  }

  return <div className=" bg-gray-200 "> 
    <img src="./public/brain.png" alt="Brain Image" className="w-30 h-30 relative top-83 left-223 " />
    <h1 className="text-2xl relative top-43 left-220 font-bold font-sans" >Second Brain</h1>
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input ref={emailRef} placeholder="Email" />
        <br></br>
        <Input ref={passwordRef} placeholder="Password" />
        <br></br>
        <Input ref={usernameRef} placeholder="Username" />
        <br></br>
        <div className="flex justify-center">
          <Button variant="primary" text="SignUp" fullWidth={true} loading={false} onClick={signup}/>
        </div>
      </div>
    </div>
  </div>
}