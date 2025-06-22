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

const TagSchema = new Schema({
  title:{type:String, required:true, unique:true}
})

export const TagModel= mongoose.model("Tags", TagSchema)

enum types{

}

const ContentSchema= new Schema({
  title:String,
  link:String,
  tags:[{type:mongoose.Types.ObjectId, ref:"TagSchema"}],
  userId:{type:mongoose.Types.ObjectId ,ref:"UserSchema", required:true}
})

export const ContentModel=mongoose.model("contents", ContentSchema);

// const ContentSchema= new Schema ({
//   link:String,
//   type:(String | types:enum) //Define an enum containing the tags 
// })