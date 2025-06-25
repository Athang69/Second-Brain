import axios from "axios";
import { Button } from "../components/button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Signin(){

  const passwordRef= useRef <HTMLInputElement> ();
  const emailRef= useRef <HTMLInputElement> ();
  const navigate=useNavigate()
  async function signin(){
    const password=passwordRef.current?.value;
    const email=emailRef.current?.value;
    const response = await axios.post(BACKEND_URL + "/api/v1/signin",{
        password,
        email
      
    })
    const jwt = response.data.token;
    localStorage.setItem("token",jwt)
    navigate("/dashboard")
    //redirect user to dashboard
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
        
        <div className="flex justify-center">
          <Button variant="primary" text="SignIn" fullWidth={true} loading={false} onClick={signin}/>
        </div>
      </div>
    </div>
  </div>
}