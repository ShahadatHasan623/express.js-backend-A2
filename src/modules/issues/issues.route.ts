import { Router } from "express";
import auth from "../../middlewares/auth";
import { AuthIssuesController } from "./issues.controller";

const route = Router();

route.post("/", auth, AuthIssuesController.createIssue);
route.get("/",AuthIssuesController.getAllIssues)
route.get("/:id",AuthIssuesController.getSingleIssues)
export const AuthIssues = route;
