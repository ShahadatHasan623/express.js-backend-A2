import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../utility/SendResponse";

const signup = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.signupUser(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Users register successfully",
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

const login = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUser(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Login Successfully",
      data: result,
    });
  } catch (error:any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const refreshToken =async(req:Request,res:Response)=>{
    try {
       const result =await AuthService.generateRefreshToken(req.cookies.refreshToken)

       res.status(200).json({
        success:true,
        message:"Refresh Token",
        data:result

       })
    } catch (error:any) {
        res.status(500).json({
            message:error.message,
            error:error
        })
    }
}

export const AuthController = {
  signup,
  login,
  refreshToken
};
