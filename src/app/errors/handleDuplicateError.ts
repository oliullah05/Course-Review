/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorSources, TGenericErrorResponse } from "../interface/error";

export const handleDuplicateError =(err:any):TGenericErrorResponse=>{
    const statusCode = 400;
    let getDuplicate="" ;
    const inputString = err.message;

    const regex = /\"(.*?)\"/;
    const match = inputString.match(regex);
    
    if (match) {
      const extractedText = match[1];
      getDuplicate=extractedText
    }
  
const errorDetails :TErrorSources =[{
    path:"",
    message:`${getDuplicate} is alrady exits`
}]


return{
    statusCode,
    message:`Duplicate Error`,
    errorDetails
}}
