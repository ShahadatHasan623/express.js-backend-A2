import express, { type Application, type Request, type Response } from "express"
import { AuthRouter } from "./auth/auth.route"
import { AuthIssues } from "./modules/issues/issues.route"
import { globalErrorHandler } from "./middlewares/globalErrorHandler"
const app:Application = express()

app.use(express.json())
app.use("/api/auth/",AuthRouter)
app.use("/api/issues", AuthIssues);
app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    message:"server is root"
  })
})
app.use(globalErrorHandler);

export default app