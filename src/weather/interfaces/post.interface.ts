import { Document } from "mongoose";


export interface Post extends Document {
   readonly selectedDate:String,
   readonly description:String,
   readonly temperature:String
}