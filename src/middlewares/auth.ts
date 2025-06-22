import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "../config";

export default function auth(req:Request, res:Response, next:NextFunction){
  const token=req.headers["authorization"];
  const decodedData=jwt.verify(token as string ,JWT_SECRET)
  if(decodedData){
    //@ts-ignore
    req.userId=decodedData.id
    next();
  } else{
    res.status(403).json({
      message:"You are not logged in"
    })
  }
}