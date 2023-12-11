/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { handleZodError } from '../errors/handleZodError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  let errorDetails;
  let errorMessage = ""
  //zod error capture 

  if (err instanceof ZodError) {

    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorSources
    errorDetails.map(details => {
      errorMessage += `${details.message}. `
    })
  
  }







if(!errorMessage){
  errorMessage=err.message
}


  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: err.stack
  });
};

export default globalErrorHandler;
