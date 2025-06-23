import express from "express"
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { z } from "zod"
import { ContentModel, LinkModel, UserModel } from "./db";
const app=express();
app.use(express.json())
import { MONGO_URL, JWT_SECRET } from "./config";
import auth from "./middlewares/auth"
import randon from "./util";
import random from "./util";


//Connecting to database
async function main (){
  await mongoose.connect(MONGO_URL as string)
  app.listen(3000);
  console.log("Listening to port 3000")
}
main();

//Routes

app.post("/api/v1/signup",async (req,res)=>{
  const requiredBody=z.object({
    email:z.string().min(5).max(35).email(),
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
        password:hashedPassword,
        userName:userName
      }) 
    }
    catch(e){
      res.status(411).json({
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

app.post("/api/v1/signin", async (req,res)=>{
  const email=req.body.email;
  const password=req.body.password;
  const user=await UserModel.findOne({
    email:email
  })
  if(!user){
    res.status(404).json({
      message:"The user does not exist"
    })
    return
  }
  const passwordMatch= await bcrypt.compare(password,user.password)
  if(passwordMatch){
    const token=jwt.sign({
      id:user._id.toString()
    },JWT_SECRET);
    res.json({
      message:"You are logged in. The token is ",
      token:token
    })
    return
  }
  else{
    res.status(403).json({
      message:"Invalid Login Credentials"
    })
    return
  }
})

app.post("/api/v1/content", auth ,async (req,res)=>{
  const title=req.body.title;
  const link=req.body.link;
  const tags=req.body.tags;

  await ContentModel.create({
    title,
    link,
    tags:[],
    //@ts-ignore
    userId:req.userId
  })

  res.status(200).json({
    message:"Contents added"
  })
  return
})

app.get("/api/v1/content",auth, async(req,res)=>{
  //@ts-ignore
  const userId=req.userId;
  const content = await ContentModel.find({
    userId:userId
  })
  res.json({
    content
  })
})

app.delete("/api/v1/content",auth, async(req,res)=>{
  const contentId=req.body.contentId;
  await ContentModel.deleteOne({
    _id:contentId,
    //@ts-ignore
    userId:req.userId
  })
  res.json({
    message:"Content deleted successfully"
  })
  return
})

app.post("/api/v1/brain/share",auth, async (req,res)=>{
  const share=req.body.share;
  if(share){
    const existingLink=await LinkModel.findOne({
      userId:req.userId
    });
    if(existingLink){
      res.json({
        hash:existingLink.hash
      })
      return
    }

    const hash=random(10)
    await LinkModel.create({
      userId:req.userId,
      hash:hash
    })
    res.json({
      message:"/share/" + hash
    })
  }
  else{
    await LinkModel.deleteOne({
      userId:req.userId
    })
    res.json({
    message:"Shareable Link Created"
  })
  }
  
})

app.get("/api/v1/brain/:shareLink", async (req,res)=>{
  //@ts-ignore
  const hash=req.params.shareLink

  const link = await LinkModel.findOne({
    hash
  })

  if(!link){
    res.status(404).json({
      message:"Incorrect input"
    })
    return
  }

  const content=await ContentModel.find({
    userId:link.userId
  }) 

  const user=await UserModel.findOne({
    _id:link.userId
  })

  res.json({
    userName:user?.userName,
    content:content
  })
})