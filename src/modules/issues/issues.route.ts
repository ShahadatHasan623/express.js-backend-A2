import { Router } from "express";
import auth from "../../middlewares/auth";
import { AuthIssuesController } from "./issues.controller";


const route =Router()

route.post(
  "/",
  auth,
  AuthIssuesController.createIssue
);
export const AuthIssues = route