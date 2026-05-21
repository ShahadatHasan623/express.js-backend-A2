import { Router } from "express";
import { AuthController } from "./auth.controller";


const route =Router()

route.post('/signup',AuthController.signup)
route.post('/login',AuthController.login)
route.post("/refresh-token",AuthController.refreshToken)

export const AuthRouter = route