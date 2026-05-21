import type { Request, Response } from "express";
import { AuthIssuesService } from "./issues.service";
import sendResponse from "../../utility/SendResponse";

const createIssue = async (req: Request, res: Response) => {
  const reporterId = req.user.id;
  try {
    const result = await AuthIssuesService.create(req.body, reporterId);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await AuthIssuesService.getAllIssues(req.query);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "get All issues",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleIssues = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AuthIssuesService.getSingleIssue(id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "get single issues",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  try {
    const result = await AuthIssuesService.updateIssue(
      req.params.id as string,
      req.body,
      req.user,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "issues updated successfully",
      data: result,
    });
  } catch (error: any) {
     sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteIssue = async (
  req: Request,
  res: Response
) => {
  try {
    await AuthIssuesService.deleteIssue(
      req.params.id as string,
      req.user
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "issues deleted successfully",
    });
  } catch (error: any) {
     sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const AuthIssuesController = {
  createIssue,
  getAllIssues,
  getSingleIssues,
  updateIssue,
  deleteIssue
};
