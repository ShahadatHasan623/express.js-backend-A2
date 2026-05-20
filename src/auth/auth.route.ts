import { Router } from "express";
import { AuthController } from "./auth.controller";


const route =Router()

route.post('/signup',AuthController.signup)
route.post('/login',AuthController.login)

export const AuthRouter = route