import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
  meta?: object;
};

const sendResponse = <T>(res: Response, data: TResponse<T> & { meta?: object }) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    statusCode: data?.statusCode,
    message: data?.message,
    meta: data?.meta, 
    data: data?.data,
  });
};

export default sendResponse;
