import express, { Application, Request, Response } from "express"
export  const app:Application = express()
import cors from "cors"
import { CourseRoutes } from "./app/modules/Course/course.route"
import notFound from "./app/middlewars/notFound"
import globalErrorHandler from "./app/middlewars/globalErrorHandler"


// parsers
app.use(express.json())
app.use(cors())



//middlewars
app.use("/api/",CourseRoutes)



app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    success:true,
    message:"welcome to Course Review server"
  })
})


app.use(globalErrorHandler)

app.use(notFound)


export default app;
