import mongoose from "mongoose";
const ObjectId= mongoose.Types.ObjectId;
import { Model, Schema } from "mongoose";

const UserSchema = new Schema({
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  userName: String
}) 

export const UserModel= mongoose.model("Users", UserSchema)

const TagSchema = new Schema({
  title:{type:String, required:true, unique:true}
})

export const TagModel= mongoose.model("Tags", TagSchema)

enum types{

}

// const ContentSchema= new Schema ({
//   link:String,
//   type:(String | types:enum) //Define an enum containing the tags 
// })