import mongoose, { mongo } from "mongoose";
const ObjectId= mongoose.Types.ObjectId;
import { Model, Schema } from "mongoose";

const UserSchema = new Schema({
  userId:ObjectId,
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  userName: String
}) 

export const UserModel= mongoose.model("users", UserSchema)

const LinkSchema = new Schema({
  hash:String,
  userId:{type:mongoose.Types.ObjectId, ref:"users", unique:true}
}) 

export const LinkModel= mongoose.model("links", LinkSchema)

const ContentSchema= new Schema({
  title:String,
  link:String,
  type:String,
  userId:{type:mongoose.Types.ObjectId ,ref:"users", required:true}
})

export const ContentModel=mongoose.model("contents", ContentSchema);
