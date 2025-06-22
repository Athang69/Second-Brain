import express from "express"
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { z } from "zod"
import { UserModel } from "./db";
const app=express();
app.use(express.json())
mongoose.connect(process.env.MONGO_URL as string)

//Routes

app.post("/api/v1/signup",async (req,res)=>{
  const requiredBody=z.object({
    email:z.string().min(5).max(20).email(),
    password:z.string().min(8,{message:"Password must be atleast 8 characters"}).max(20,{message:"Password cannot exceed more than 20 characters"}).refine((val)=>
      /[a-z]/.test(val),{
      message:"The password must contain atleast 1 lowercase character"
      }).refine((val)=>
      /[A-Z]/.test(val),{
        message:"The password must contain atleast 1 uppercase character"
      }).refine((val)=>
      /[^a-zA-Z0-9]/.test(val),{
        message:"The password must contain atleast 1 special character"
      }),
      userName:z.string().min(5).max(20).refine((val)=>
      !val.includes(" "),{
        message:"The username cannot include spaces"
      })
    })
    const parsedData=requiredBody.safeParse(req.body)
    if(!parsedData.success){
      res.json({
        message:"The format of data you entered is invalid",
        error:parsedData.error.flatten().fieldErrors
      })
    return 
    }
    const email=req.body.email;
    const password=req.body.password
    const userName=req.body.userName
    let thrownError=false;
    try{
      const hashedPassword = await bcrypt.hash(password,5);
      await UserModel.create({
        email:email,
        password:password,
        userName:userName
      }) 
    }
    catch(e){
      res.json({
        message:"User already exists"
      })
      thrownError=true;
    }
    if(!thrownError){
      res.json({
        message:"You are successfully signed up!"
      })
    }
  })

app.post("/api/v1/signin",(req,res)=>{

})

app.post("/api/v1/content",(req,res)=>{

})

app.get("/api/v1/content",(req,res)=>{

})

app.delete("/api/v1/content",(req,res)=>{

})

app.post("/api/v1/brain/share",(req,res)=>{

})

app.get("/api/v1/brain/shareLink",(req,res)=>{

})