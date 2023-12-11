import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/error";

export const handleCastError =(err:mongoose.Error.CastError):TGenericErrorResponse=>{
    const statusCode = 400;

return{
    statusCode,
    message:"Invalid ID",
   errorDetails:err,
  
}}
