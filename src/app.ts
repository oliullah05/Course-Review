import express, { Application, Request, Response } from "express"
export  const app:Application = express()
import cors from "cors"
import { CourseRoutes } from "./app/modules/Course/course.route"
import notFound from "./app/middlewars/notFound"
import globalErrorHandler from "./app/middlewars/globalErrorHandler"
import { CategoryRoutes } from "./app/modules/Category/Category.route"
import { ReviewRoutes } from "./app/modules/Review/review.route"


// parsers
app.use(express.json())
app.use(cors())



//middlewars
app.use("/api/",CourseRoutes)
app.use("/api/",CategoryRoutes)
app.use("/api/",ReviewRoutes)



app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    success:true,
    message:"welcome to Course Review server"
  })
})


app.use(globalErrorHandler)

app.use(notFound)


export default app;
