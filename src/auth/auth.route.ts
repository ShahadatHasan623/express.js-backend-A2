import { Router } from "express";
import { AuthController } from "./auth.controller";


const route =Router()

route.post('/signup',AuthController.signup)

export const AuthRouter = route