/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { handleZodError } from '../errors/handleZodError';
import { handleCastError } from '../errors/handleCastError';
import { handleValidationError } from '../errors/handleValidationError';
import { handleDuplicateError } from '../errors/handleDuplicateError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  let errorDetails:any;
  let errorMessage = ""


  //zod error capture 

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails= simplifiedError.errorDetails
    errorDetails.map((details: { message: string; })  => {
      errorMessage += `${details.message}. `
    })
  }



  //mongoose error capture 


  else if (err?.name === "ValidationError") {
  
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorDetails
    errorDetails.map((details: { message: string; })  => {
      errorMessage += `${details.message}. `
    })
  }










//capture cast error 

else if (err?.name === "CastError") {
  const inputString = err.message;
  const regex = /"([0-9a-fA-F]+)"/;
  const match = inputString.match(regex);

  if (match) {
    const extractedValue = match[1];
    errorMessage=`${extractedValue} is not a valid ID!`
  }

  const simplifiedError = handleCastError(err)
  statusCode = simplifiedError.statusCode;
  message = simplifiedError.message;
  errorDetails = simplifiedError.errorDetails

}



  //mongoose duplicate error

  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorDetails;
    errorMessage =errorDetails[0].message
  }













if(!errorMessage){
  errorMessage=err.message
}


  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: err.stack,
  
  });
};

export default globalErrorHandler;
