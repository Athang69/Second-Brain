import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "../config";

function auth(req:Request, res:Response, next:NextFunction){
  const token=req.headers["authorization"];
  const decodedData=jwt.verify(token as string ,JWT_SECRET as string)
  if(decodedData){
    if(typeof decodedData ==="string"){
      res.status(200).json({
        message:"You are logged in"
      })
      return;
    }
    //req.userId=(decodedData as JwtPayload).id;
    next();
  } else{
    res.status(403).json({
      message:"You are not logged in"
    })
  }
}