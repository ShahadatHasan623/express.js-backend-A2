import express, { type Application, type Request, type Response } from "express"
import { AuthRouter } from "./auth/auth.route"
const app:Application = express()

app.use(express.json())
app.use("/api/auth/",AuthRouter)
app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    message:"server is root"
  })
})



export default app