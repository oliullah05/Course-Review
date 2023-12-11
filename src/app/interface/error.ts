
export type TErrorSources = {
    path: string | number,
    message: string
  }[] | Error
 export type TGenericErrorResponse = {
    statusCode:number,
    message:string,
    errorDetails:TErrorSources,
   
}